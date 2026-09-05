---
title: Test Plan — Negative Paths and Verifier States
section: "11"
source_pages: []
---

# 11 — Test Plan — Negative Paths and Verifier States

<!-- Provenance: this section is not transcribed from the submission PDF. It was added in response to SCF reviewer guidance (August 2026), which requires "a test plan beyond happy-path issuance" and a verifier that "fails closed and displays distinct non-valid states". -->

Every case below is an automated test in the repository, runnable by a reviewer with the commands in [12 — Verification and Reproducibility](12-verification-and-reproducibility.md). A case is only considered passing when the asserted outcome is observed **and**, where the expected outcome is a rejection, the test proves that **no Stellar transaction was submitted**.

## 11.1 Material Class Enum

All scoring and validation tests operate against this fixed four-class enum. Any value outside it is invalid input.

| Code | Material class | Award |
| --- | --- | --- |
| `PET_LARGE` | PET bottle ≥500 ml | 6 JBIN |
| `PET_SMALL` | PET small / container | 4 JBIN |
| `FOIL_SACHET` | Foil sachet | 2 JBIN |
| `BIODEGRADABLE` | Biodegradable | 2 JBIN |

Scoring is **per item**. Weight in kg is an optional off-chain field used only for the LGU volume report; it never affects the JBIN award and is never written on-chain.

## 11.2 Happy Path (Baseline)

| # | Case | Expected result | Proving artifact |
| --- | --- | --- | --- |
| H1 | Allowlisted submitter posts a well-formed event for each of the four classes | One JBIN payment per event at the enum rate | Four Testnet transaction hashes, one per class |
| H2 | Event record is written before dispatch and frozen at hash computation | Stored record hash matches the memo on the settled transaction | Record row + memo visible on explorer |
| H3 | Recipient wallet holds a JBIN trustline before payment | Payment succeeds; balance increments by the awarded amount | Account page showing JBIN balance |

## 11.3 Negative Cases

| # | Case | Input | Expected result | Proving artifact |
| --- | --- | --- | --- | --- |
| N1 | **Unauthorized submitter** | Payout request signed by / originating from an identity absent from the submitter allowlist | Rejected with a distinct authorization error. **No transaction.** | Test asserts HTTP 403 and a zero-length dispatch log |
| N2 | **Malformed fields** | Missing wallet address; non-ISO timestamp; non-numeric item count | Rejected with a field-level validation error. **No transaction.** | Test asserts HTTP 422 per variant |
| N3 | **Invalid material class** | `material_class` outside the four-class enum (e.g. `GLASS`, empty string, null) | Rejected as invalid enum value. **No transaction.** | Test asserts HTTP 422 |
| N4 | **Duplicate submission** | The same event hash posted twice | Second request rejected as a duplicate. **Exactly one transaction exists.** | Two responses (201 then 409) plus a single hash in the ledger |
| N5 | **Overwrite attempt** | Mutation of a settled event record (change class, count, or wallet after dispatch) | Rejected; the stored record is unchanged and the ledger is unchanged | Test asserts the record is immutable post-settlement |
| N6 | **Wrong-network verification** | A Mainnet transaction hash, or a Testnet hash checked against the Mainnet passphrase | Verifier returns the distinct `WRONG_NETWORK` state | Verifier response snapshot |
| N7 | **Horizon unavailable** | Horizon endpoint unreachable, or responding with a timeout | Verifier returns the distinct `UNAVAILABLE` state. Dispatch retry **must not double-pay**. | Test asserts one payment after an injected timeout-then-retry |
| N8 | **Unknown record lookup** | A syntactically valid event hash that was never recorded | Verifier returns the distinct `UNKNOWN` state — never `VALID`, never blank | Verifier response snapshot |
| N9 | **Missing trustline** | Destination wallet has no JBIN trustline | Rejected before or at dispatch with a distinct error; no partial state persisted | Test asserts the error and that no record is marked settled |
| N10 | **Underfunded distributor** | Distribution account lacks sufficient JBIN | Rejected with a distinct insufficient-balance error | Test asserts the error path |
| N11 | **Daily cap exceeded** | Events pushing one wallet past 60 JBIN in a single day | Rejected once the cap is reached. **No transaction** for the rejected events. | Test asserts awards stop at exactly 60 JBIN/day |

N4, N5, N7 and N11 are the cases most likely to produce a silent double-payment in a naive implementation, so each asserts on the transaction count rather than only on the HTTP response.

## 11.4 Verifier States (D3)

The public verifier **fails closed**: any input that cannot be positively proven valid renders as a non-valid state. There is no default-valid path and no blank result.

| State | Meaning |
| --- | --- |
| `VALID` | The transaction exists on the configured network, the memo matches the recorded event hash, and the awarded amount matches the enum rate for the recorded class |
| `MALFORMED` | The submitted identifier is not a well-formed transaction hash or event hash |
| `MISMATCHED` | The transaction exists but its memo or amount does not match the recorded event |
| `WRONG_NETWORK` | The transaction belongs to a different Stellar network than the one configured |
| `UNKNOWN` | No record exists for the submitted identifier |
| `UNAVAILABLE` | Horizon could not be reached; validity is undetermined |

`UNAVAILABLE` must be visually distinct from `VALID` and from every other non-valid state. Reporting an undetermined result as valid is the specific failure this requirement exists to prevent.

## 11.5 Test Commands and CI

The suite runs under `pytest` and is wired to GitHub Actions on every push. Exact commands are recorded in [12 — Verification and Reproducibility](12-verification-and-reproducibility.md) so that a reviewer can reproduce the run without reading the workflow file.

Network-dependent cases (N6, N7, N9, N10) run against Stellar Testnet where a live path is required, and against injected fixtures where the failure cannot be provoked reliably on demand. Each test states which mode it uses; no test claims a live result it obtained from a fixture.

## 11.6 Evidence Produced

- CI run URL showing the full suite green, with the commit SHA
- Per-case pass/fail table exported from the run
- Verifier response snapshots for all six states in §11.4
- Transaction-count assertions for N4, N5, N7 and N11 demonstrating no double-payment
