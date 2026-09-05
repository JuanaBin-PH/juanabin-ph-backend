---
title: Evidence of Completion
section: "05"
source_pages: [13, 14, 15]
---

# 05 — Evidence of Completion

<!-- Revision note: revised in response to SCF reviewer guidance (August 2026). Each row is now marked unconditional or conditional; the per-kilogram completion metric was replaced with a per-item metric; rows were added for the test suite, verifier states and reproducibility package; commit count updated for four deliverables. -->

All evidence listed below will be submitted to the SCF Instawards team upon sprint completion (by **September 29, 2026**). Evidence is structured around verifiable, on-chain or publicly accessible artifacts only — no self-reported metrics without blockchain proof.

**Unconditional** rows are engineering artifacts that cannot be blocked by participant availability. **Conditional** rows depend on household consent, wallet onboarding and qualifying-submission completion; where onboarding does not complete, these are produced on simulated accounts and labelled as simulated.

## 6.1 Evidence Checklist

### Unconditional

| ✓ | Evidence Item | Type / Format | Where to Verify |
| --- | --- | --- | --- |
| [ ] | JBIN asset identifier `JBIN-<ISSUER>` | Stellar Explorer URL (Testnet) | `stellar.expert/explorer/testnet/asset/…` |
| [ ] | JBIN issuance transaction hash | Stellar transaction hash URL | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | JBIN asset issuer account URL | Stellar Explorer URL (Testnet) | `stellar.expert/explorer/testnet/account/…` |
| [ ] | Distribution account URL (separate from issuer) | Stellar Explorer URL (Testnet) | `stellar.expert/explorer/testnet/account/…` |
| [ ] | Minimum 10 test wallet Stellar public keys | Text list + Explorer links | `stellar.expert/explorer/testnet` |
| [ ] | JBIN trustline establishment transactions (3+ samples) | Stellar transaction hash URLs | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | GitHub commit — Wallet Provisioning Module | GitHub commit SHA + URL | `github.com/BusloBuilders/juanabin-ph` |
| [ ] | 25+ JBIN reward transaction hashes | Stellar transaction list (CSV or table) | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | `PET_LARGE` reward transaction at 6 JBIN | Stellar Explorer URL | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | `PET_SMALL` reward transaction at 4 JBIN | Stellar Explorer URL | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | `FOIL_SACHET` reward transaction at 2 JBIN | Stellar Explorer URL | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | `BIODEGRADABLE` reward transaction at 2 JBIN | Stellar Explorer URL | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | Unauthorized-submitter rejection producing no transaction (test N1) | CI test output | CI run URL |
| [ ] | Duplicate-submission rejection producing exactly one transaction (test N4) | CI test output + transaction count | CI run URL |
| [ ] | Daily-cap rejection producing no transaction (test N11) | CI test output | CI run URL |
| [ ] | All 11 negative-path cases passing | Public CI run URL + per-case table | `github.com/BusloBuilders/juanabin-ph/actions` |
| [ ] | Verifier response snapshots for all six states | Screenshots or JSON snapshots | Public verifier URL |
| [ ] | GitHub commit — Reward Logic Engine | GitHub commit SHA + URL | `github.com/BusloBuilders/juanabin-ph` |
| [ ] | Live admin dashboard public URL | Public URL (browser-accessible) | Recorded in [12 §12.8](12-verification-and-reproducibility.md#128-evidence-index) |
| [ ] | Live public verifier URL (no login) | Public URL (browser-accessible) | Recorded in [12 §12.8](12-verification-and-reproducibility.md#128-evidence-index) |
| [ ] | LGU-ready pilot report (PDF export) | PDF attachment to submission | Attached to SCF forum post (September 29, 2026) |
| [ ] | Video walkthrough (3–5 min demo) | YouTube URL (unlisted or public) | `youtube.com/…` |
| [ ] | GitHub commit — Dashboard & Verifier Source | GitHub commit SHA + URL | `github.com/BusloBuilders/juanabin-ph` |
| [ ] | Reproducibility package complete (D4) | [12 — Verification and Reproducibility](12-verification-and-reproducibility.md) with all placeholders filled | GitHub (public) |
| [ ] | `.env.example` present, containing no key material | Repository file | `github.com/BusloBuilders/juanabin-ph/.env.example` |
| [ ] | Complete reward transaction list | CSV committed to the repository | GitHub (public) |
| [ ] | README documentation for all four deliverables | GitHub README (public) | `github.com/BusloBuilders/juanabin-ph/README.md` |

### Conditional — subject to consent, wallet onboarding and qualifying-submission completion

| ✓ | Evidence Item | Type / Format | Where to Verify |
| --- | --- | --- | --- |
| [ ] | 10 pilot household wallet addresses with JBIN balances | Stellar Explorer: account list | `stellar.expert/explorer/testnet` |
| [ ] | 20+ pilot on-chain reward transactions | Transaction hash list | `stellar.expert/explorer/testnet/tx/…` |
| [ ] | Measured breakage rate against the ~45% assumption | Dashboard summary | Admin dashboard |

Where any conditional row is satisfied on simulated rather than real household accounts, the evidence package states this explicitly for that row. No conditional row is presented as a real-participant result without real participants.

## 6.2 Minimum On-Chain Metrics for Completion

### Unconditional

| Metric | Minimum Threshold | Evidence Type |
| --- | --- | --- |
| Total Stellar transactions (Testnet) | **50+ transactions** | Stellar Explorer account history |
| JBIN reward payouts (Deliverable 2 test) | **25+ payouts** | Stellar Explorer transaction list |
| Material classes exercised with correct amounts | **4 of 4** | Per-class transaction hashes |
| Negative-path cases passing | **11 of 11** | Public CI run URL |
| Verifier states demonstrated | **6 of 6** | Verifier snapshots |
| GitHub commits (public, with code) | **4+ commits (1 per deliverable)** | GitHub commit history |

### Conditional

| Metric | Target | Evidence Type |
| --- | --- | --- |
| Pilot household wallets with JBIN balance | **10 wallets** | Stellar Explorer account pages |
| Pilot segregation events (on-chain) | **20+ events** | Dashboard + Stellar transaction hashes |
| Qualifying items rewarded (D2 tests + pilot) | **45+ items** — derived as 25 test payouts plus 20 pilot events at a minimum of one item each | Dashboard item counts + transaction hashes |
| Weight logged (kg) | No threshold — weight is an optional off-chain field and does not affect any award | LGU report volume section |

Weight is reported as measured rather than against a threshold. Under per-item scoring, a kilogram target would commit the pilot to a figure the award logic does not control. See [14 §14.1](14-data-and-authorization-policy.md#141-on-chain-data-policy).
