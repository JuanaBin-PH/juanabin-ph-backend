---
title: System Flow Diagrams
section: "15"
source_pages: []
---

# 15 — System Flow Diagrams

<!-- Provenance: this section is not transcribed from the submission PDF. Every gate, state and label below is taken from the specifications already published in this documentation set - the intake schema and dispatch chain in 03, the rejection cases N1-N11 and verifier states in 11, the on-chain data policy and freeze point in 14, and the week banding in 04. Nothing here introduces new behaviour. -->

These diagrams render natively on GitHub. Each decision node is annotated with the test case that proves it in [11 — Test Plan](11-test-plan.md), so the diagram and the test suite can be checked against each other.

## 15.1 Earn Flow — Submission to Settlement

The architecture is **off-chain logic, on-chain settlement**: the backend decides whether a throw earns anything, and Stellar records the payment. Every rejection path below terminates *before* a transaction is built, which is why the negative-path tests assert on transaction count rather than only on the HTTP response.

```mermaid
flowchart TD
    START(["Resident drops a sorted item<br/>into a JuanaBin"]) --> SUB["Officer or bin submits event<br/>wallet public key · material class<br/>item count · timestamp · submitter ID"]

    subgraph OFFCHAIN["OFF-CHAIN — the backend decides the award"]
        direction TB
        SUB --> G1{"Submitter on<br/>allowlist?"}
        G1 -->|no| N1["N1 · 403 unauthorized<br/>no transaction"]
        G1 -->|yes| G2{"Fields<br/>well-formed?"}
        G2 -->|no| N2["N2 · 422 validation error<br/>no transaction"]
        G2 -->|yes| G3{"Class in the<br/>4-value enum?"}
        G3 -->|no| N3["N3 · 422 invalid enum<br/>no transaction"]
        G3 -->|yes| HASH["Compute SHA-256 event hash<br/>wallet + timestamp + class + count<br/><b>record freezes here</b>"]
        HASH --> G4{"Hash seen<br/>before?"}
        G4 -->|yes| N4["N4 · 409 duplicate<br/>exactly one transaction total"]
        G4 -->|no| G5{"Would exceed<br/>60 JBIN/day?"}
        G5 -->|yes| N11["N11 · rejected at cap<br/>no transaction"]
        G5 -->|no| SCORE["Score per item<br/>PET_LARGE 6 · PET_SMALL 4<br/>FOIL_SACHET 2 · BIODEGRADABLE 2"]
        SCORE --> G6{"Destination holds<br/>JBIN trustline?"}
        G6 -->|no| N9["N9 · distinct error<br/>no partial state persisted"]
        G6 -->|yes| G7{"Distributor<br/>funded?"}
        G7 -->|no| N10["N10 · insufficient balance"]
    end

    G7 -->|yes| BUILD["Build JBIN payment operation<br/>source = distribution account<br/>memo carries the event hash"]

    subgraph ONCHAIN["ON-CHAIN — Stellar Testnet settles"]
        direction TB
        BUILD --> SIGN["Sign with the distributor key"]
        SIGN --> HORIZON{"Horizon<br/>accepted?"}
        HORIZON -->|timeout| N7["N7 · retry<br/>must not double-pay"]
        N7 -.->|"idempotent on event hash"| HORIZON
        HORIZON -->|yes| TX["Payment settled<br/>transaction hash returned"]
    end

    TX --> PERSIST["Persist the hash against<br/>the frozen record"]
    PERSIST --> SETTLED{{"Settled record"}}
    SETTLED --> G8{"Mutation of a<br/>settled record?"}
    G8 -->|yes| N5["N5 · rejected<br/>record and ledger unchanged"]
    SETTLED --> DASH["Admin dashboard"]
    SETTLED --> VER["Public verifier · no login<br/>see 15.2"]
    SETTLED --> EXP["stellar.expert · Testnet"]

    classDef reject fill:#fdeaea,stroke:#b3261e,color:#5f1412
    classDef gate fill:#eef2ff,stroke:#4338ca,color:#1e1b4b
    classDef chain fill:#e8f5ee,stroke:#1b6b3f,color:#0f3d24
    class N1,N2,N3,N4,N5,N7,N9,N10,N11 reject
    class G1,G2,G3,G4,G5,G6,G7,G8,HORIZON gate
    class BUILD,SIGN,TX,EXP chain
```

Reading it: **nine of the ten decision nodes can only reduce what happens.** There is one path to a payment and nine ways to stop before one exists. The daily cap and the duplicate check both sit upstream of `SCORE`, so a capped or duplicate event never even reaches the point where an amount is calculated.

The freeze point matters for what the hash can be claimed to prove. The record is hashed and frozen *before* dispatch, so the memo on the settled transaction commits to field values that existed prior to payment. That is the whole basis of [14 §14.2](14-data-and-authorization-policy.md#142-what-the-event-hash-proves) — and also its limit: it proves the record is unaltered, not that the material class was judged correctly.

<!-- TODO: resolve the memo encoding before Week 2. Stellar `memo_text` holds 28 bytes, so a 64-character hex SHA-256 digest plus a material class code does not fit. Two workable options: use `memo_hash`, which holds exactly the 32-byte raw digest but leaves no room for the class code, and read the class from the record instead; or use `memo_text` with the class code plus a truncated hash prefix, accepting weaker collision resistance in the memo while the full digest stays in the database. SPRINT.md Week 2 task 7 and docs/03 currently both say "material class + event hash", which is not encodable as written. -->

## 15.2 Verifier State Machine — Fail Closed

The verifier is the artifact that lets a reviewer refute the project rather than trust it. It takes a pasted identifier from anyone, with no login, and resolves to exactly one of six states.

```mermaid
flowchart TD
    IN(["Anyone pastes a transaction hash<br/>or event hash · no login"]) --> P{"Well-formed<br/>identifier?"}
    P -->|no| MAL["MALFORMED"]
    P -->|yes| Q{"Horizon<br/>reachable?"}
    Q -->|no| UNAV["UNAVAILABLE<br/>validity undetermined"]
    Q -->|yes| R{"Record exists for<br/>this identifier?"}
    R -->|no| UNK["UNKNOWN"]
    R -->|yes| S{"On the configured<br/>network?"}
    S -->|no| WRONG["WRONG_NETWORK"]
    S -->|yes| T{"Memo <b>and</b> amount<br/>match the record?"}
    T -->|no| MIS["MISMATCHED"]
    T -->|yes| VAL["VALID"]

    classDef ok fill:#e8f5ee,stroke:#1b6b3f,color:#0f3d24
    classDef bad fill:#fdeaea,stroke:#b3261e,color:#5f1412
    classDef gate fill:#eef2ff,stroke:#4338ca,color:#1e1b4b
    class VAL ok
    class MAL,UNAV,UNK,WRONG,MIS bad
    class P,Q,R,S,T gate
```

**One path reaches `VALID`; five do not, and there is no sixth path that returns nothing.** That asymmetry is the design requirement. A verifier that returned "valid" — or a blank result a viewer reads as valid — when Horizon was simply unreachable would make every other claim in this repository unfalsifiable. `UNAVAILABLE` therefore renders visually distinct from `VALID`, and N7 in the test plan exists specifically to hold that behaviour in place.

`WRONG_NETWORK` is the state a reviewer hits by pasting a Mainnet hash into a Testnet-configured verifier. That is correct behaviour, not a defect — see [12 §12.3](12-verification-and-reproducibility.md#123-network-configuration).

## 15.3 Deliverable Sequence and the Conditional Track

The sprint's structural answer to the SCF reviewer guidance: the engineering chain and the participant track are separate, and only the engineering chain carries a gate.

```mermaid
flowchart LR
    subgraph W1["Week 1 · Aug 31 – Sep 6"]
        D1["<b>D1</b><br/>JBIN asset<br/>wallet provisioning<br/>allowlist"]
    end
    subgraph W2["Week 2 · Sep 7 – 13"]
        D2["<b>D2</b><br/>logic engine<br/>N1–N11 green in CI"]
    end
    subgraph W3["Week 3 · Sep 14 – 20"]
        D3["<b>D3</b><br/>dashboard<br/>fail-closed verifier"]
    end
    subgraph W4["Week 4 · Sep 21 – 27"]
        D4["<b>D4</b><br/>reproducibility<br/>cold-start build"]
    end
    subgraph BUF["Buffer · Sep 28 – 29"]
        SUBMIT(["QA and submit<br/>Sep 29"])
    end

    D1 -->|gate| D2 -->|gate| D3 -->|gate| D4 -->|gate| SUBMIT
    PT["<b>[P] conditional participant track</b><br/>10 households · 20+ pilot events<br/>simulated and labelled if onboarding slips"]
    PT -.->|"gates nothing"| SUBMIT

    classDef eng fill:#eef2ff,stroke:#4338ca,color:#1e1b4b
    classDef cond fill:#fff7e6,stroke:#a16207,color:#4a3209
    class D1,D2,D3,D4 eng
    class PT cond
```

The dashed edge is the point. Every solid edge is a gate that can fail the sprint; the dashed edge cannot. If no household consents in time, D1 through D4 still complete and the conditional rows in [05 — Evidence of Completion](05-evidence-of-completion.md) are produced on simulated accounts and labelled as simulated.

## 15.4 What These Diagrams Do Not Show

Stated so the diagrams are not read as claiming more than the system does.

- **No classification step is drawn inside the bin.** The diagram begins after a material class has been asserted by an officer or device. Whether that assertion is correct is outside what any of these flows can establish — [14 §14.2](14-data-and-authorization-policy.md#142-what-the-event-hash-proves).
- **No weight appears anywhere in the earn flow.** Awards are per item. Weight, where recorded, is an optional off-chain field that affects no branch and no amount.
- **No personal data crosses into the on-chain subgraph.** The only fields that reach the ledger are the recipient wallet public key, the material class code, the event hash and the JBIN amount — [14 §14.1](14-data-and-authorization-policy.md#141-on-chain-data-policy).
- **No governance is drawn, because none exists yet.** A single operator holds the issuer, the distributor and the allowlist. There is no multisig node to draw and no revocation path — [14 §14.5](14-data-and-authorization-policy.md#145-governance-limitations--stated-plainly).
