---
title: Data and Authorization Policy
section: "14"
source_pages: []
---

# 14 — Data and Authorization Policy

<!-- Provenance: this section is not transcribed from the submission PDF. It was added in response to SCF reviewer guidance (August 2026) covering on-chain data minimisation, the evidentiary scope of hash commitments, a qualifying-submission rubric, and issuer authorization. -->

## 14.1 On-Chain Data Policy

Stellar Testnet is a public ledger and its records are permanent. Only the minimum needed to make a reward payment auditable is written on-chain.

**Written on-chain (public by design):**

| Field | Where | Why it is safe to publish |
| --- | --- | --- |
| Recipient wallet public key | Payment operation | A pseudonymous account identifier, not an identity |
| Material class code | Memo | One of four enum values; reveals nothing about a person |
| Event hash | Memo | A SHA-256 digest; not reversible to its inputs |
| JBIN amount | Payment operation | Derived from the class code |

**Never written on-chain:**

Household or resident name · street address or house number · GPS coordinates · phone number · email address · government ID · photographs · officer or collector identity · raw weight readings · any free-text field.

Household GPS coordinates appeared as an optional intake field in an earlier revision of [03 — Scope of Work](03-scope-of-work.md) and have been removed from the schema entirely. Location is not collected at household granularity, on-chain or off-chain. The LGU report aggregates to barangay level only.

Weight in kilograms, where recorded, is an off-chain field used solely for the volume figures in the LGU report. It does not affect the JBIN award and is not written to the ledger.

## 14.2 What the Event Hash Proves

Each qualifying submission produces a SHA-256 event hash over its frozen field values. The hash is written to the payment memo.

**The hash proves:** that the stored event record matches the values that were submitted, that the record has not been altered after settlement, and that the same event was not submitted twice.

**The hash does not prove:** that the waste was actually segregated correctly · that the declared material class is accurate · that any declared weight is honest · that the submitting officer acted in good faith · that the waste was collected, transported or processed · that any barangay, LGU, DENR or DILG office has reviewed, verified or approved the event.

An earlier revision of [03 — Scope of Work](03-scope-of-work.md) labelled this mechanism "Fraud Prevention." That overstated it. It is a duplicate-and-replay control. Fraud committed at the point of submission — a colluding officer declaring events that never happened — is not detectable by any hash, and is not addressed within this sprint.

## 14.3 Qualifying Submission Rubric

Applied before any submission earns JBIN. Fixed before pilot participation begins so that eligibility is not decided case by case.

| Element | Rule |
| --- | --- |
| **Eligible classes** | Exactly four: `PET_LARGE`, `PET_SMALL`, `FOIL_SACHET`, `BIODEGRADABLE`. Any other value is rejected as invalid input (test N3). |
| **Required metadata** | Recipient wallet public key; material class code; item count; event timestamp (ISO 8601); submitter ID. All five required; a missing or malformed field rejects the submission (test N2). |
| **Optional metadata** | Weight in kg — off-chain only, never affects the award. |
| **Authorized submitter** | Only an identity present on the submitter allowlist. Requests from any other origin are rejected with no transaction (test N1). |
| **Review process** | Automated validation against this rubric at intake. There is no human editorial review; an event either satisfies every rule or is rejected. Rejections are logged with a reason code and produce no ledger entry. |
| **Content-freeze point** | The record freezes at hash computation, which occurs **before** payment dispatch. No field may change after that point. Mutation attempts are rejected and the ledger is unchanged (test N5). |
| **Daily limit** | 60 JBIN per wallet per calendar day. Events beyond the cap are rejected, not deferred (test N11). |

## 14.4 Issuer and Distributor Authorization

| Role | Custody | Permitted operations |
| --- | --- | --- |
| Issuing account | Secret seed held offline, outside this repository and outside every deployment environment | The initial JBIN issuance to the distribution account, and nothing else |
| Distribution account | Secret seed in the reward engine host's environment variable store only | All reward payments to household wallets |
| Submitter allowlist | Configuration in the reward engine, controlled by the project operator | Determines who may submit a qualifying event |

The allowlist is mutable and the project operator can change it at any time. Changes are recorded in the repository's commit history.

## 14.5 Governance Limitations — Stated Plainly

This sprint is **not decentralized**. Buslo Builders, operating as JuanaBin PH, controls the issuing account, the distribution account and the submitter allowlist. A reward payment therefore evidences that *the operator's system* recorded and settled an event under the rules in §14.3. It does not evidence independent or institutional verification.

Not designed, not built and not claimed within this sprint: multisignature control of the issuing or distribution accounts · a revocation or clawback policy · an independent audit path over the allowlist · key rotation procedure · production incident response · any form of external verification authority.

These are prerequisites for a Mainnet deployment and are named here so that the sprint's claims are not read as broader than they are.

## 14.6 Institutional References

References in this documentation set to barangay offices, LGUs, DILG, DENR, RA 9003 or RA 11898 describe **intended use and design target only**. No collaboration, endorsement, approval or review by any of these bodies is claimed or implied. Where a specific partner is named elsewhere in this repository, it is named only where written confirmation exists; where none exists, no organization is named.

Third-party statistics quoted in [01 — Executive Summary](01-executive-summary.md) and [02 — Problem Statement & Objectives](02-problem-and-objectives.md) — national waste tonnage and unbanked population figures — are external figures requiring citation and are marked accordingly. Forward projections in [06 — Budget Justification](06-budget-justification.md) are project-reported estimates, not audited results.
