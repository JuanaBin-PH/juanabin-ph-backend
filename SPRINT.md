# JuanaBin PH — 30-Day Stellar Sprint Plan

**Window:** August 31 – September 29, 2026 — exactly **30 calendar days** (Aug 31 plus September 1–29). Four working weeks plus a **2-day** submission buffer. Aug 31 is a Monday; Sep 29 is a Tuesday.

**Focus:** Ship the reward-points loop on Stellar Testnet — provision wallets, issue JBIN, and settle every correct throw as a real on-chain payment — with enough transaction evidence, passing negative-path tests and reproducibility material to close the four Instawards deliverables.

**Architecture:** Off-chain logic + on-chain settlement — the backend decides when a correct throw earns points, then sends a real JBIN payment on Stellar.

**Asset model:** JBIN is a Stellar classic custom asset (issuing account + distribution account + trustlines), not a Soroban smart contract. Rationale in [docs/13-tech-stack-and-deployment.md](docs/13-tech-stack-and-deployment.md).

**Network:** Testnet for this sprint.

**Scope discipline:** every deliverable is engineering-only. Household onboarding, briefings and community activity are tracked as a separate **conditional participant track** and gate nothing. Tasks below are marked **[E]** engineering or **[P]** conditional participant.

Week bands run Monday–Sunday from the Aug 31 start; the buffer is Mon Sep 28 – Tue Sep 29. Two days is tight by design — it absorbs QA and submission, not unfinished deliverables.

## Pre-sprint checkpoint — Sun Aug 30, 2026

| # | Task |
| --- | --- |
| 1 | Push the public repository with the revised documentation set and no secrets committed |
| 2 | Submit to the **August 30** SCF feedback round |
| 3 | Confirm the Freighter payout wallet is switched to **Mainnet** and the address starts with `G` |
| 4 | Confirm no scratch scripts, temporary files or unused generated artifacts remain in the repository |

No on-chain evidence is dated before Aug 31, so the ledger record and the stated sprint window agree.

## Deliverables

| ID | Name | Done when |
| --- | --- | --- |
| **D1** | Stellar Wallet Provisioning + JBIN Reward Asset (Testnet) | JBIN asset live on Testnet from a funded issuing account; distribution account separate from the issuer and holding supply; minimum 10 test wallets provisioned through the Kinde flow with JBIN trustlines established; explorer URLs published for the issuer account, the distribution account and 3+ trustline transactions; an allowlisted submitter can trigger a payout and a non-allowlisted submitter cannot; provisioning code committed. |
| **D2** | Segregate-to-Earn Logic Engine + Negative-Path Test Suite | Scoring table enforced for all four material classes; daily cap, duplicate rejection and overwrite rejection provably working; minimum 25 reward payments executed on Testnet with a transaction hash recorded for every payout; all 11 negative-path cases in [docs/11-test-plan.md](docs/11-test-plan.md) green in public CI, each asserting on transaction count; engine and tests committed under MIT. |
| **D3** | Admin Dashboard + Public Verifier | Admin dashboard and no-login public transparency page live at a public URL with explorer links; no-login verifier live and **failing closed** with six distinct states — `VALID`, `MALFORMED`, `MISMATCHED`, `WRONG_NETWORK`, `UNKNOWN`, `UNAVAILABLE` — with a captured snapshot for each; LGU-ready PDF/CSV export generated; walkthrough video published; dashboard and verifier code committed. |
| **D4** | Reproducibility & Evidence Package | [docs/12-verification-and-reproducibility.md](docs/12-verification-and-reproducibility.md) complete with no unfilled placeholders — repo URL and commit tag, asset ID, issuer and distributor addresses, network config, build instructions, `.env.example`, test commands, the step-by-step verification guide and the complete transaction list — and a cold-start clone that builds and tests from those instructions alone. |

**[P] Conditional participant target, gating nothing:** 10 pilot households with active wallets holding JBIN balances and 20+ on-chain pilot reward events. If onboarding does not complete, this is executed on simulated accounts and labelled as simulated in the evidence package.

Cumulative target across the sprint: **50+ Testnet transactions** and **4+ public commits (one per deliverable)**, matching the thresholds published in [docs/05-evidence-of-completion.md](docs/05-evidence-of-completion.md).

## Reward Parameters

**1 JBIN = 1 point, awarded per correctly segregated item.** This is the shipping model — per-item, not per-kilogram. The bin hardware has a fill-level ultrasonic sensor and no load cell, so it cannot report mass; a per-kilogram award would have to be entered by hand and could not be evidenced by the device. Weight, where recorded at all, is an optional off-chain field that affects no award.

Peso values are display only — nothing is pegged on-chain.

| Material class | Enum code | Award | Notes |
| --- | --- | --- | --- |
| PET bottle ≥500 ml | `PET_LARGE` | 6 JBIN | Highest-value stream |
| PET small / container | `PET_SMALL` | 4 JBIN | |
| Foil sachet | `FOIL_SACHET` | 2 JBIN | |
| Biodegradable | `BIODEGRADABLE` | 2 JBIN | |

Any material class outside this four-value enum is rejected before dispatch — test case N3 in [docs/11-test-plan.md](docs/11-test-plan.md).

| Control | Value | Enforced by |
| --- | --- | --- |
| Daily earn cap | 60 JBIN / user / day | Logic engine, before payment dispatch |
| Redemption threshold | 2,000 JBIN | Logic engine + redemption flow |
| Assumed breakage | ~45% | Assumption at sprint start; measured during pilot if onboarding completes |

The cap of 60 JBIN/day is exactly ten ≥500 ml PET bottles per user per day.

## Week 1 — Mon Aug 31 – Sun Sep 6 (D1)

| # | Task | Track | D |
| --- | --- | --- | --- |
| 1 | Set up Testnet environment; fund the issuing account via Friendbot | [E] | D1 |
| 2 | Create the issuing and distribution accounts as separate keypairs; document custody of both secrets outside the repo | [E] | D1 |
| 3 | Issue the JBIN classic asset; set the distribution account's JBIN trustline and push supply to it | [E] | D1 |
| 4 | Lock down the operational rule that only the distribution account ever pays users; the issuer stays cold | [E] | D1 |
| 5 | Wire Kinde authentication to keypair auto-generation; fund each new wallet to the minimum XLM reserve | [E] | D1 |
| 6 | Auto-establish each new wallet's JBIN trustline as part of provisioning | [E] | D1 |
| 7 | Provision 10 test wallets end to end; confirm every trustline landed | [E] | D1 |
| 8 | Implement the submitter allowlist; prove an allowlisted submitter can trigger a payout and a non-allowlisted one cannot | [E] | D1 |
| 9 | Commit the provisioning module (GitHub commit #1) | [E] | D1 |
| 10 | Post the Week 1 SCF forum update (Sun Sep 6) | [E] | — |

**On-chain evidence produced:** issuer account page on `testnet.stellar.expert`; distribution account page; `changeTrust` transaction hashes for 10 test wallets (3+ published as samples); the initial issuance payment hash from issuer to distribution — for a classic asset that first payment *is* the issuance.

## Week 2 — Mon Sep 7 – Sun Sep 13 (D2)

| # | Task | Track | D |
| --- | --- | --- | --- |
| 1 | Define the throw-event schema the bin/officer submits: user ID, material class, timestamp, device ID. **No household location field.** | [E] | D2 |
| 2 | Implement the scoring table as configurable data, not inline constants — 6 / 4 / 2 / 2 by class, version-tracked in the repo | [E] | D2 |
| 3 | Enforce the 60 JBIN/user/day cap server-side, evaluated before any payment is built | [E] | D2 |
| 4 | Implement the idempotency hash (user ID + timestamp + material class) and reject duplicates before dispatch | [E] | D2 |
| 5 | Freeze the event record at hash computation, before payment dispatch; reject any later mutation of a settled record | [E] | D2 |
| 6 | Build the payment dispatcher: construct the JBIN payment from the distribution account, sign, submit, persist the returned hash | [E] | D2 |
| 7 | Write the memo field per payment (material class + event hash) so each award is self-describing on-chain | [E] | D2 |
| 8 | Handle the failure paths that actually occur on Testnet: missing trustline, underfunded distributor, timeout-then-retry without double-paying | [E] | D2 |
| 9 | Write and green all 11 negative-path cases N1–N11; each asserts on transaction count, not only on the HTTP response | [E] | D2 |
| 10 | Wire pytest into GitHub Actions; publish the CI run URL | [E] | D2 |
| 11 | Execute 25+ reward payments covering all four material classes; export the hash list | [E] | D2 |
| 12 | Commit the reward engine and test suite under MIT (GitHub commit #2) | [E] | D2 |
| 13 | Post the Week 2 SCF forum update (Sun Sep 13) | [E] | — |

**On-chain evidence produced:** 25+ reward payment hashes with per-class samples (6 / 4 / 2 / 2 JBIN); memo contents visible on explorer; a public CI run showing 11 of 11 negative-path cases passing, with N4, N5, N7 and N11 each asserting that no extra transaction was created.

## Week 3 — Mon Sep 14 – Sun Sep 20 (D3)

| # | Task | Track | D |
| --- | --- | --- | --- |
| 1 | Deploy the admin dashboard: JBIN issued, counts by material class, per-household earnings, transaction hashes with explorer links | [E] | D3 |
| 2 | Build the no-login public transparency page reading aggregated data from the Testnet ledger | [E] | D3 |
| 3 | Build the no-login verifier and implement all six fail-closed states | [E] | D3 |
| 4 | Capture a verifier snapshot for each state, including a pasted Mainnet hash (`WRONG_NETWORK`) and an unrecorded hash (`UNKNOWN`) | [E] | D3 |
| 5 | Commit the dashboard and verifier source (GitHub commit #3) | [E] | D3 |
| 6 | Post the Week 3 SCF forum update (Sun Sep 20) | [E] | — |
| 7 | Onboard up to 10 pilot households — Kinde signup, wallet provisioning | [P] | — |
| 8 | Run the pilot to 20+ on-chain reward events across the four material classes | [P] | — |
| 9 | Start the breakage measurement: record points earned vs. points redeemed per user from day one of the pilot | [P] | — |
| 10 | Conduct the barangay briefing and collect first household feedback | [P] | — |

**On-chain evidence produced:** dashboard live at a public URL with each row linking to its explorer transaction; verifier live with six distinct states captured. **[P]** Up to 10 pilot household account pages showing JBIN balances and 20+ pilot reward transaction hashes, labelled simulated if run on test accounts.

## Week 4 — Mon Sep 21 – Sun Sep 27 (D3 + D4)

| # | Task | Track | D |
| --- | --- | --- | --- |
| 1 | Implement and test the redemption flow against the 2,000 JBIN threshold | [E] | D3 |
| 2 | Test redemption on a **seeded** account — the threshold is unreachable organically inside this window; see "Reconcile before submitting" | [E] | D3 |
| 3 | Build the LGU-ready PDF/CSV export: volumes by class, JBIN issued, participating households anonymised, explorer audit links | [E] | D3 |
| 4 | Record the 3–5 minute walkthrough: signup, throw, payment dispatch, transaction on explorer, dashboard updating, verifier rejecting a bad hash; publish to YouTube | [E] | D3 |
| 5 | Fill every placeholder in `docs/12-verification-and-reproducibility.md` — repo URL, commit tag, asset ID, issuer and distributor addresses, network config, test commands | [E] | D4 |
| 6 | Confirm `.env.example` is complete and contains no key material | [E] | D4 |
| 7 | Export the complete reward transaction list as CSV and commit it | [E] | D4 |
| 8 | Cold-start validation: clone into a clean environment, follow the build instructions verbatim, run the test commands | [E] | D4 |
| 9 | Write the README for all four deliverables | [E] | D1–D4 |
| 10 | Post the Week 4 SCF forum update (Sun Sep 27) | [E] | — |
| 11 | Report the measured breakage rate against the ~45% assumption, or record that the pilot sample was insufficient to measure it | [P] | — |

**On-chain evidence produced:** redemption transaction hash from the seeded test account; cumulative transaction count confirmed at 50+ across issuer, distribution, and household accounts.

## Buffer — Mon Sep 28 – Tue Sep 29 (QA + submission)

Two days only.

| # | Task |
| --- | --- |
| 1 | Full end-to-end QA of D1, D2, D3 and D4 against each "done when" column above |
| 2 | Compile the evidence package: every explorer URL, every commit SHA, the CI run URL, the six verifier snapshots, the video link, the LGU report |
| 3 | Validate each on-chain metric against the published thresholds in `docs/05-evidence-of-completion.md` |
| 4 | Confirm every conditional item is either satisfied with real participants or explicitly labelled simulated |
| 5 | Post the completion report to the SCF forum and submit by **Tue Sep 29, 2026** |

## Out of scope for these 30 days

- Mainnet — Testnet only for this sprint.
- GCash/Maya cash-out — no fiat off-ramp is built or tested.
- Soroban smart-contract version of the earn/redeem logic — the logic stays off-chain in the backend.
- SEP-24/31 anchor integration — no deposit/withdraw or cross-border rails.
- Non-custodial user wallets — keys are provisioned and held server-side for the pilot.
- Multi-barangay rollout — one pilot barangay, ten households.
- Multisig governance, revocation policy and independent audit of the issuer — see [docs/14-data-and-authorization-policy.md](docs/14-data-and-authorization-policy.md) §14.5.

All seven are post-sprint concerns, not part of this 30-day scope.

## Reconcile before submitting

Two items remain open. Two earlier items are now closed and recorded here so the change is traceable.

1. ~~**Calendar length vs. the "30-day" label.**~~ **Closed.** The window moved to Aug 31 – Sep 29, 2026, which is exactly 30 calendar days. The label and the calendar now agree, and [docs/](docs/) carries the new window throughout — weekly gates, sprint chart, the signature block in [docs/08-team-information.md](docs/08-team-information.md), the constraints in [docs/06-budget-justification.md](docs/06-budget-justification.md), and the SCF forum update dates (Sep 6, Sep 13, Sep 20, Sep 27, plus the Sep 29 completion report).
2. ~~**Token economics conflict.**~~ **Closed in favour of per-item.** 1 JBIN = 1 point per correctly segregated item, at 6 / 4 / 2 / 2 by class. The per-kilogram model is withdrawn: the bin hardware carries a fill-level ultrasonic sensor and no load cell, so mass cannot be measured at the point of the throw and a per-kilogram award could not be evidenced by the device. [docs/03-scope-of-work.md](docs/03-scope-of-work.md), [docs/05-evidence-of-completion.md](docs/05-evidence-of-completion.md) and [docs/07-stellar-alignment.md](docs/07-stellar-alignment.md) were rewritten to match, and the "15+ kg waste diverted" completion metric was replaced with a per-item metric plus an optional off-chain weight log with no threshold.
3. **Redemption threshold is unreachable inside the sprint. Still open.** At the 60 JBIN/day cap, a user earning the maximum every single day for 30 days reaches 1,800 JBIN — short of the 2,000 threshold. No pilot household can hit redemption organically in this window, so redemption must be demonstrated on a seeded balance, and the pilot cannot produce a real breakage figure for redeemed points. Either lower the pilot threshold, raise the cap, or state plainly in the submission that redemption is demonstrated rather than observed. The re-dating did not change this: 30 days at 60/day is still 1,800.
4. **Confirm the program rules against the live pages before submitting. Still open.** Known requirements as of Aug 29, 2026: the repository must be public; it must show meaningful commit history and proof of development; it must expose no keys, secrets or credentials and no unnecessary generated artifacts; the submission must include a link to a deployed Testnet contract **and/or** clear documentation and evidence of progress in the README; the payout wallet address must be **Mainnet** and start with `G`; the feedback round closes Aug 30. Two things still need checking against the live sources rather than any copy captured here: the SCF Instawards program page for evidence rules, accepted artifact types and whether Testnet-only evidence remains sufficient; and the Rise In "Stellar Journey to Mastery — Monthly Builder Challenges" page at `https://www.risein.com/programs/stellar-journey-to-mastery-monthly-builder-challenges`, which has not been read. If that programme requires a Soroban contract rather than a classic asset, or sets a different window or award amount, [docs/13-tech-stack-and-deployment.md](docs/13-tech-stack-and-deployment.md) §13.1 and this window are what change.

## Long-Term Goals (Beyond the 30-Day Sprint)

After this sprint closes, the direction is a Mainnet launch of JBIN, peso cash-out through a BSP-licensed e-money issuer, and scaling from the pilot barangay to a multi-barangay / LGU rollout. Direction only — none of it is in the 30-day scope above.
