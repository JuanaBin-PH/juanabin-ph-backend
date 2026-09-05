---
title: 30-Day Weekly Timeline — August 31 – September 29, 2026
section: "04"
source_pages: [9, 10, 11, 12]
---

# 04 — 30-Day Weekly Timeline — August 31 – September 29, 2026

<!-- Revision note: re-dated to the operative August 31 – September 29, 2026 window, which is exactly 30 calendar days. Restructured in response to SCF reviewer guidance (August 2026): onboarding and community-briefing tasks were moved out of the deliverable path into a separately-labelled conditional participant track, the negative-path test suite and fail-closed verifier were inserted into Weeks 2–3, and Deliverable 4 (Reproducibility & Evidence Package) was added. Every week gate is now satisfiable by engineering work alone. -->

**Sprint Period:** August 31, 2026 (Day 1) → September 29, 2026 (Day 30) • **Structure:** 4 working weeks, each with a focus area, task breakdown and week-end milestone gate, followed by a 2-day submission buffer • **Deliverable Staggering:** D1 by Week 1 → D2 by Week 2 → D3 by Week 3 → D4 by Week 4 → full QA & submission in the buffer

Every task below is marked **[E]** for engineering or **[P]** for the conditional participant track. Week gates depend on **[E]** tasks only. No **[P]** task can fail a gate; if participant onboarding slips, the **[P]** track is executed against simulated accounts and labelled as simulated in the evidence package.

## Sprint at a Glance — Aug 31 to Sep 29, 2026

<!-- This chart is derived from the Aug 31 – Sep 29, 2026 week banding used in SPRINT.md. It is NOT the bar chart printed on p.9 of the source PDF, which charts the superseded Aug 20 – Sep 18 window. -->

| Activity / Deliverable | Aug 31–Sep 01 | Sep 02–03 | Sep 04–06 | Sep 07–08 | Sep 09–10 | Sep 11–13 | Sep 14–15 | Sep 16–17 | Sep 18–20 | Sep 21–22 | Sep 23–24 | Sep 25–27 | Sep 28 | Sep 29 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Week 1: Foundation** | █ | █ | █ | | | | | | | | | | | |
| **D1: Wallet + JBIN Asset** | █ | █ | █ | | | | | | | | | | | |
| **Week 2: Engine & Tests** | | | | █ | █ | █ | | | | | | | | |
| **D2: Logic Engine + Test Suite** | | | | █ | █ | █ | | | | | | | | |
| **Week 3: Dashboard & Verifier** | | | | | | | █ | █ | █ | | | | | |
| **D3: Dashboard + Public Verifier** | | | | | | | █ | █ | █ | | | | | |
| **Week 4: Redemption & Evidence** | | | | | | | | | | █ | █ | █ | | |
| **D4: Reproducibility Package** | | | | | | | | | | | █ | █ | █ | |
| **Buffer: QA & Submit** | | | | | | | | | | | | | █ | █ |
| **[P] Conditional Participant Track** | | | | | | | █ | █ | █ | █ | █ | | | |

Legend: Week 1 (Aug 31 – Sep 6) • Week 2 (Sep 7–13) • Week 3 (Sep 14–20) • Week 4 (Sep 21–27) • Buffer (Sep 28–29)

## WEEK 1 — August 31 – September 6, 2026 | Days 1–7 | Foundation & Asset Setup

**Key Tasks:**

- **[E]** August 31, 2026: Sprint kickoff — set up Stellar Testnet environment, fund issuer account via Friendbot
- **[E]** August 31 – September 1: Issue JBIN classic custom asset on Stellar Testnet; create a distribution account separate from the issuer; record the issuance transaction hash
- **[E]** September 1–2: Integrate Kinde authentication flow with Stellar wallet auto-provisioning pipeline
- **[E]** September 2–3: Test minimum 5 wallet provisioning events end-to-end; validate trustline establishment
- **[E]** September 3–4: Push wallet provisioning code to GitHub (initial commit); configure CI/CD pipeline
- **[E]** September 4–5: Deploy staging environment on cloud infrastructure (SSL, domain, Testnet connection)
- **[E]** September 5–6: Full end-to-end testing of Kinde → Stellar wallet flow; 10 test wallets provisioned with trustlines
- **[E]** September 5–6: Implement the submitter allowlist and prove an allowlisted submitter can trigger a payout while a non-allowlisted submitter cannot

**Milestones:**

- JBIN asset and issuer account published on `testnet.stellar.expert`
- Issuance transaction hash recorded in [12 §12.2](12-verification-and-reproducibility.md#122-stellar-asset-identity)
- GitHub Commit #1: wallet provisioning module pushed (public repo)
- Week 1 SCF Forum progress update posted (September 6, 2026)

> **Gate:** JBIN live on Testnet with a resolvable asset ID and issuance hash • issuer and distribution accounts separate • 10 test wallets with trustlines • Kinde → Stellar wallet flow operational • allowlist enforced in both directions

## WEEK 2 — September 7–13, 2026 | Days 8–14 | Reward Logic Engine & Negative-Path Tests

**Key Tasks:**

- **[E]** September 7: Build waste intake form (mobile-responsive web UI) with the required data fields, excluding any household location field
- **[E]** September 7–8: Implement the JBIN reward calculation engine (Python) over the four-class material enum — `PET_LARGE` 6, `PET_SMALL` 4, `FOIL_SACHET` 2, `BIODEGRADABLE` 2
- **[E]** September 8–9: Connect reward engine to Stellar payment dispatch; test the first live JBIN transfer on Testnet
- **[E]** September 9–10: Implement the event-hash duplicate and replay control, and the content-freeze point before payment dispatch
- **[E]** September 9–10: Implement the 60 JBIN per user per day cap
- **[E]** September 10–11: Test every material class with correct JBIN amounts; capture one transaction hash per class
- **[E]** September 10–12: Write and green the 11 negative-path cases N1–N11 in [11 — Test Plan](11-test-plan.md); each asserts on transaction count, not only on the HTTP response
- **[E]** September 11–12: Execute 25+ reward transactions on Testnet; log all transaction hashes
- **[E]** September 12–13: Commit reward engine and test suite to GitHub with inline documentation; deploy to staging; publish the CI run URL

**Milestones:**

- 25+ JBIN reward transaction hashes logged (Stellar Expert URLs exported)
- All 11 negative-path cases passing in public CI
- Four material classes each evidenced by a transaction at the correct amount
- GitHub Commit #2: reward logic engine and tests pushed (MIT licensed)
- Week 2 SCF Forum progress update posted (September 13, 2026)

> **Gate:** Reward engine live on Testnet • 25+ reward transactions with Explorer URLs • four-class scoring and daily cap enforced • 11 of 11 negative-path cases green in public CI • GitHub Commit #2 pushed

## WEEK 3 — September 14–20, 2026 | Days 15–21 | Dashboard & Public Verifier

**Key Tasks:**

- **[E]** September 14: Deploy admin dashboard (waste metrics, JBIN issued, estimated CO²e avoided) to a public URL
- **[E]** September 14–15: Build the public transparency page with Stellar Explorer links, no login required
- **[E]** September 15–17: Build the no-login public verifier and implement all six fail-closed states — `VALID`, `MALFORMED`, `MISMATCHED`, `WRONG_NETWORK`, `UNKNOWN`, `UNAVAILABLE` — per [11 §11.4](11-test-plan.md#114-verifier-states-d3)
- **[E]** September 17–18: Capture verifier response snapshots for all six states, including a pasted Mainnet hash and an unrecorded hash
- **[E]** September 18–19: Implement the PDF/CSV export function for LGU reporting
- **[E]** September 19–20: Commit dashboard and verifier code to GitHub; deploy to production URLs
- **[P]** September 14–16: Onboard up to 10 pilot households (Kinde signup + wallet provisioning)
- **[P]** September 16–18: Run 20+ pilot segregation events; issue JBIN rewards on-chain; log all transaction hashes
- **[P]** September 18–20: Conduct the community briefing session for pilot households; collect first feedback

**Milestones:**

- Dashboard live at a public URL with Stellar Explorer links (publicly accessible)
- Public verifier live with no login, demonstrating six distinct fail-closed states
- GitHub Commit #3: dashboard and verifier source code pushed
- Week 3 SCF Forum progress update posted (September 20, 2026)
- **[P]** Up to 10 pilot household Stellar wallets active with JBIN balances

> **Gate:** Dashboard live at public URL • no-login verifier live • 6 of 6 verifier states demonstrated with snapshots • GitHub Commit #3 pushed
>
> **[P] Conditional target, not part of the gate:** 10 pilot households active • 20+ on-chain pilot transactions verified. Where onboarding does not complete, these are produced on simulated accounts and labelled as simulated.

## WEEK 4 — September 21–27, 2026 | Days 22–28 | Redemption, Reproducibility & Documentation

**Key Tasks:**

- **[E]** September 21: Implement and test the redemption flow against the 2,000 JBIN redemption threshold on a seeded account
- **[E]** September 21–22: Record the 3–5 minute walkthrough video (screen + voiceover); upload to YouTube
- **[E]** September 22–23: Compile all Stellar Explorer URLs and GitHub commit SHAs into the evidence package
- **[E]** September 23–24: Fill every placeholder in [12 — Verification and Reproducibility](12-verification-and-reproducibility.md) — repo URL, commit tag, asset ID, issuer and distributor addresses, network config, test commands
- **[E]** September 23–24: Verify `.env.example` is present, complete and contains no key material
- **[E]** September 24–25: Export the complete reward transaction list as CSV and commit it
- **[E]** September 25–26: Cold-start validation — clone the repository into a clean environment, follow the build instructions verbatim, and run the test commands
- **[E]** September 25–26: Generate the LGU-ready pilot report (PDF); validate all on-chain metrics against the acceptance criteria
- **[E]** September 26–27: Write README documentation for all four deliverables; finalize the GitHub repository
- **[E]** September 26–27: Internal sign-off on the evidence package; prepare the forum completion report
- **[P]** September 21–24: Report the measured breakage rate against the ~45% assumption set at sprint start, or record that the pilot sample was insufficient to measure it

**Milestones:**

- Video walkthrough published (YouTube URL submitted to SCF)
- Redemption flow tested with an on-chain transaction hash recorded
- Cold-start reproduction completed by someone other than the original author where possible
- Week 4 SCF Forum progress update posted (September 27, 2026)

> **Gate:** Video published (YouTube URL) • redemption tested on-chain • reproducibility package complete with no unfilled placeholders • cold-start build succeeds from the documented instructions alone • evidence package assembled

## BUFFER — September 28–29, 2026 | Days 29–30 | QA & Submission

The buffer is 2 days, not a full week. It absorbs final QA and submission only; it is not slack for unfinished deliverables.

**Key Tasks:**

- **[E]** September 28: Full end-to-end QA of all four deliverables against their acceptance criteria in [03 — Scope of Work](03-scope-of-work.md)
- **[E]** September 28: Final evidence review — every Explorer URL, every commit SHA, the CI run URL, the verifier snapshots, the video link, the LGU report
- **[E]** September 28: Validate each on-chain metric against the minimum thresholds in [05 — Evidence of Completion](05-evidence-of-completion.md)
- **[E]** September 29: Post the completion report to the SCF Forum; submit all evidence to the SCF Instawards team by **September 29, 2026**

**Milestones:**

- All 27 unconditional evidence items confirmed; the 3 conditional items resolved or labelled simulated
- SCF Forum completion report published (September 29, 2026)
- **Sprint closed: September 29, 2026**

> **Gate:** Full unconditional evidence checklist complete • every conditional item either satisfied or explicitly labelled simulated • SCF submission delivered by September 29, 2026
