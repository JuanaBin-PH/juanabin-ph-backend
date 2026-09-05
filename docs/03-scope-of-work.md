---
title: Scope of Work — 30-Day Deliverables
section: "03"
source_pages: [6, 7, 8]
---

# 03 — Scope of Work — 30-Day Deliverables

<!-- Revision note: this section was revised in response to SCF reviewer guidance (August 2026). Changes: scoring moved from per-kilogram to per-item; household GPS removed from the intake schema; "Fraud Prevention" renamed to duplicate-and-replay control with corrected evidentiary wording; acceptance criteria split into unconditional engineering and conditional participant criteria; D4 added; institutional references reframed as intended use. Source page attribution is retained for the material that originated in the submission PDF. -->

Each deliverable separates **unconditional** criteria — engineering work that cannot be blocked by participant availability — from **conditional** criteria that depend on household consent and onboarding. Engineering completion is never gated on participant recruitment.

## D1 — Stellar Wallet Provisioning + JBIN Reward Token

*Build and deploy the Stellar wallet provisioning pipeline and the JBIN custom asset (token) on Stellar Testnet. This delivers the financial inclusion layer: any household completing Kinde authentication receives a funded Stellar wallet ready to receive JBIN tokens.*

| Component | Specification |
| --- | --- |
| **Stellar Asset** | JBIN token issued on Stellar Testnet using Stellar Python SDK. Asset code: `JBIN`. Issuer account funded and activated on Testnet. |
| **Wallet Provisioning** | Kinde authentication triggers auto-generation of Stellar keypair. Wallet funded with 1 XLM minimum reserve. Trustline to JBIN established automatically. |
| **Token Economics** | 1 JBIN = 1 point. Awards are per item by material class — see D2. Non-tradeable, non-speculative. Redeemable for Buslo artisan products (PHP equivalent). Fixed utility value. |
| **User Authentication** | Kinde auth layer — no bank account, no government ID, no e-wallet required. Mobile-first signup flow for low-income household access. |
| **Account Separation** | Issuing account and distribution account are separate keypairs. The issuer performs the initial issuance only; the distribution account makes every reward payment. Custody per [14 — Data and Authorization Policy](14-data-and-authorization-policy.md). |
| **On-Chain Verification** | All wallet creations and JBIN issuances visible on `stellar.expert` (Testnet) and Stellar Laboratory. Public, permissionless audit trail. |

> **Acceptance Criteria — Unconditional:**
> - JBIN asset deployed on Testnet; asset identifier `JBIN-<ISSUER>` resolves on Stellar Explorer
> - Issuance transaction hash resolves on Testnet
> - Issuing and distribution accounts created as separate keypairs
> - Minimum 10 test wallets provisioned via Kinde flow
> - JBIN trustlines established for all test wallets
> - Stellar Explorer URLs provided for issuer account and 3+ test transactions
> - Provisioning source code public under MIT
> - Unit tests pass in CI
> - An allowlisted submitter can trigger a reward payment; a non-allowlisted submitter cannot (tests H1, N1 in [11 — Test Plan](11-test-plan.md))
> - GitHub commit with wallet provisioning code

## D2 — Segregate-to-Earn Logic Engine

*Design, build, and test the core business logic that converts verified waste segregation events into JBIN token rewards sent to household Stellar wallets.*

| Component | Specification |
| --- | --- |
| **Waste Intake Form** | Web-based form for waste collector/barangay officer to log: household Stellar wallet public key, material class, item count, event timestamp, submitter ID. Weight in kg is an optional off-chain field for volume reporting only. Household location is not collected. |
| **Reward Calculation** | Python-based logic, scored **per item**: `PET_LARGE` (PET bottle ≥500 ml) = 6 JBIN &nbsp;\|&nbsp; `PET_SMALL` (PET small / container) = 4 JBIN &nbsp;\|&nbsp; `FOIL_SACHET` = 2 JBIN &nbsp;\|&nbsp; `BIODEGRADABLE` = 2 JBIN. Configurable rate table with version history on GitHub. Daily cap of 60 JBIN per wallet per day enforced server-side before dispatch. |
| **Stellar Payment Dispatch** | Reward engine calls Stellar Python SDK: constructs payment operation, signs with distributor keypair, submits to Testnet. Transaction hash logged to the database and returned to admin UI. |
| **Duplicate & Replay Control** | Each submission generates a SHA-256 event hash (wallet + timestamp + material class + count), frozen before dispatch. Duplicate submissions are rejected before any Stellar transaction is initiated. The hash is written to the Stellar memo. It proves the record is unaltered and unduplicated — it does **not** prove the waste was correctly segregated or that any authority verified the event. See [14 §14.2](14-data-and-authorization-policy.md#142-what-the-event-hash-proves). |
| **Carbon Offset Estimate** | CO²e avoided is estimated off-chain for the LGU report using published per-material factors — PET (~3 kg CO²e/kg), Sachet (~2 kg CO²e/kg), Organic (~0.5 kg CO²e/kg) — applied to logged weight where available. It is a project-reported estimate, not a measurement, and is not written on-chain. |
| **Negative-Path Testing** | Eleven rejection cases specified in [11 — Test Plan](11-test-plan.md), each asserting that no Stellar transaction is created where rejection is the expected outcome. |

> **Acceptance Criteria — Unconditional:**
> - Scoring enforced for all four material classes with correct JBIN amounts
> - Daily cap of 60 JBIN per wallet per day provably enforced
> - Duplicate submission and post-settlement overwrite both provably rejected
> - Minimum 25 test reward transactions executed on Testnet, with a transaction hash recorded for every payout
> - All 11 negative-path cases in [11 — Test Plan](11-test-plan.md) passing in CI, with a public CI run URL
> - GitHub commit with reward engine source code (MIT licensed)

## D3 — Admin Dashboard + Public Verifier

*Deploy a publicly accessible admin dashboard and a no-login verifier showing waste diversion metrics, JBIN payouts, and Stellar Explorer links, then run a pilot where households earn JBIN.*

| Component | Specification |
| --- | --- |
| **Admin Dashboard** | Web dashboard: total JBIN issued, item counts by material class, per-household earnings, estimated CO²e avoided, Stellar transaction hashes with Explorer links, pilot timeline status. |
| **Public Verifier** | No-login page where anyone can paste a transaction hash or event hash and check it against the Testnet ledger. **Fails closed** — returns distinct states for `VALID`, `MALFORMED`, `MISMATCHED`, `WRONG_NETWORK`, `UNKNOWN` and `UNAVAILABLE`, and never reports an undetermined result as valid. Specified in [11 §11.4](11-test-plan.md#114-verifier-states-d3). |
| **Community Transparency** | The verifier and aggregate dashboard require no login. Intended for use by residents, barangay officials and independent auditors. Data sourced from Stellar Testnet ledger. |
| **LGU-Ready Reporting** | Export function generating PDF/CSV report of pilot results: item counts and volumes by material class, JBIN issued, estimated CO²e avoided, participating households anonymised and aggregated to barangay level, Stellar Explorer audit links. Structured with RA 9003 reporting in mind; no LGU or DENR office has reviewed or approved this format. |
| **Video Walkthrough** | 3–5 minute screen-recorded video: signup, waste logging, JBIN reward dispatch, transaction visible on Stellar Explorer, dashboard update, and a verifier check including a non-valid state. Published to YouTube. |
| **Pilot Scope** | Target of 10 households across 1 pilot barangay, each performing at least 2 segregation events, generating a target of 20+ on-chain JBIN reward transactions. |

> **Acceptance Criteria — Unconditional:**
> - Admin dashboard live at a public URL with Stellar Explorer links
> - Public verifier live at a public URL, requiring no login
> - Verifier returns all six distinct states, demonstrated for each (tests N6, N7, N8 in [11 — Test Plan](11-test-plan.md))
> - LGU-ready export function generating PDF/CSV
> - Video walkthrough published (YouTube URL)
> - Dashboard and verifier source code public under MIT
> - GitHub commit with dashboard source code

> **Acceptance Criteria — Conditional**, subject to household consent, wallet onboarding and qualifying-submission completion:
> - 10 pilot households with active Stellar wallets holding JBIN balances
> - 20+ on-chain pilot reward transactions
>
> Where onboarding does not complete within the window, the pilot is demonstrated on simulated accounts, labelled as simulated in the dashboard and the evidence package. Engineering completion of D3 does not depend on participant recruitment.

## D4 — Reproducibility & Evidence Package

*Publish everything a reviewer needs to rebuild the system from a cold start and independently verify a reward payment.*

| Component | Specification |
| --- | --- |
| **Revision identity** | Repository URL, submission tag, and commit SHA |
| **Build instructions** | Clone-to-running steps, verified from a clean environment |
| **Environment template** | `.env.example` with variable names and empty values; no key material |
| **Asset identity** | Asset code, issuer public key, distribution account public key, asset identifier, issuance transaction hash |
| **Network configuration** | Network name, Horizon endpoint, network passphrase, explorer base URL |
| **Test commands** | Exact commands to run the full suite and each negative-path group, plus a public CI run URL |
| **Verification guide** | Numbered steps letting a reviewer confirm a reward payment end to end, including at least two non-valid verifier states |
| **Transaction list** | Complete list of every reward transaction produced during the sprint |
| **Demo video** | The 3–5 minute walkthrough from D3 |

> **Acceptance Criteria — Unconditional:**
> - [12 — Verification and Reproducibility](12-verification-and-reproducibility.md) complete with every placeholder filled
> - Build instructions reproduced successfully from a clean environment
> - `.env.example` present and containing no key material
> - Asset identifier and issuance transaction hash resolve on Testnet
> - Public CI run URL showing the full suite green
> - Complete reward transaction list published
> - Demo video published
