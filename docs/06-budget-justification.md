---
title: Budget Justification — $5,000 USD Instaward
section: "06"
source_pages: [16, 17]
---

# 06 — Budget Justification — $5,000 USD Instaward

## 8.1 Budget Breakdown

| Budget Category | Amount (USD) | Justification |
| --- | --- | --- |
| **Stellar Development — Wallet, Token, SDK** | $1,800 | Lead blockchain developer: 60 hours @ $30/hr. Stellar Python SDK integration, JBIN asset deployment, Kinde-Stellar authentication bridge, Testnet-to-Mainnet migration planning (Aug 31 – Sep 29, 2026). |
| **Backend — Reward Logic Engine** | $1,200 | Full-stack developer: 40 hours @ $30/hr. Python reward calculation engine, waste intake form, Stellar payment dispatch, duplicate prevention system, database integration. |
| **Frontend — Dashboard & Pilot UI** | $900 | Frontend developer: 30 hours @ $30/hr. Admin dashboard, public transparency page, LGU export function, mobile-responsive household UI, video walkthrough production. |
| **Testing & QA Engineering** | $600 | Negative-path test suite covering the 11 rejection cases in [11 — Test Plan](11-test-plan.md), CI pipeline configuration, verifier fail-closed state implementation and snapshots, and cold-start validation of the reproducibility package in [12 — Verification and Reproducibility](12-verification-and-reproducibility.md). |
| **Infrastructure & Tools** | $300 | Cloud hosting (staging + pilot deployment Aug 31 – Sep 29, 2026), domain name, SSL certificate, Stellar Testnet faucet XLM (via Friendbot), CI/CD tooling. |
| **Documentation & SCF Submission** | $200 | Technical writing, README documentation, LGU compliance report formatting, SCF forum post preparation, evidence package compilation (delivery by Sep 29, 2026). |
| **TOTAL** | **$5,000** | **Full Instaward budget utilized for direct development, testing and pilot delivery** |

> **Cost-Effectiveness Note — project-reported projection, not audited results.** The figures in this paragraph are forward estimates produced by JuanaBin PH. They are not measured outcomes of this sprint and no independent party has verified them. The $5,000 Instaward funds the complete technical foundation for a platform that, at a projected 1,000 households, is estimated to generate ~2,400 kg CO²e offset per month and ~PHP 500,000–2,000,000 in annual household income, and to onboard 1,000 previously unbanked Filipinos onto the Stellar network. <!-- TODO: cite the modelling assumptions behind these projections, or drop them from the submission -->

## 8.2 Instawards Program Constraints — Acknowledgement

- [ ] **Hard Deadline:** All four deliverables and evidence must be submitted to the SCF Instawards team by **September 29, 2026**. No extensions without prior written SCF approval.
- [ ] **On-Chain Evidence Required:** Completion is not acknowledged based on verbal or written claims alone. All technical deliverables must be evidenced by Stellar Explorer transaction URLs, GitHub commit hashes, and/or publicly accessible URLs.
- [ ] **No Speculative Tokens:** JBIN tokens are non-tradeable, non-speculative utility tokens. JBIN will not be listed on any exchange, marketed as an investment, or used to raise external capital. No fiat off-ramp is built or tested within this sprint.
- [ ] **Open-Source Code:** All code produced under this Instaward will be published to a public GitHub repository under MIT License within the sprint window, as required by SCF Instawards terms.
- [ ] **Stellar Network Exclusivity:** This engagement is Stellar-native. No multi-chain bridges or alternative blockchain deployments are planned within this sprint (Aug 31 – Sep 29, 2026).
- [ ] **Testnet Scope:** This sprint operates on Stellar Testnet. Mainnet migration is planned for Phase 1, pending SCF grant approval. Testnet transactions are fully valid as Instawards evidence.
- [ ] **Technical Scope Only:** The four deliverables are engineering artifacts. Household onboarding and community activities are participant-support activities outside the deliverables, and no acceptance criterion depends on them — see [03 — Scope of Work](03-scope-of-work.md).
- [ ] **SCF Forum Reporting:** JuanaBin PH will post weekly progress updates to the SCF Community Forum throughout the engagement (Sep 6, Sep 13, Sep 20, Sep 27, 2026), plus a final completion report on September 29, 2026.
