---
title: Next Steps
section: "09"
source_pages: [22, 23]
---

# 09 — Next Steps

<!-- Scope note: the source PDF (pp.22-23) carried a five-phase roadmap running to 2028+. Only the sprint itself and the immediate next step within 2026 are retained here; the 2027-2028 phases and the long-horizon projections were removed to keep this documentation set focused on the August 31 - September 29, 2026 window. -->

<!-- Revision note: re-dated to the operative August 31 - September 29, 2026 window and revised in response to SCF reviewer guidance (August 2026): the deliverable count is four, the pilot-household enabler is marked conditional, and the SDG agency column is labelled as intended relevance rather than partnership. -->

Successful completion of this Instaward sprint (August 31 – September 29, 2026) unlocks the next phase of JuanaBin PH development. The four deliverables produced in this sprint form the technical foundation for a full SCF grant application.

## 7.1 Immediate Next Step

| Phase | Timeline | Milestone | Dependency |
| --- | --- | --- | --- |
| 0 | **Aug 31 – Sep 29, 2026** | Instaward Sprint: 4 Deliverables + On-Chain Evidence | This SOW — current submission (August 30, 2026) |
| 1 | Oct – Nov 2026 | Full SCF Grant Application — citing the Instaward evidence package from the September 29, 2026 submission | Successful completion of Phase 0 deliverables by Sep 29, 2026 |

## 7.2 How This Instaward Enables Phase 1 (SCF Grant)

- **On-chain transaction history** provides verifiable proof of Stellar integration quality (generated Aug 31 – Sep 29, 2026)
- **Negative-path test suite green in public CI** demonstrates that the system rejects invalid, duplicate and out-of-policy submissions rather than only handling the happy path — see [11 — Test Plan](11-test-plan.md)
- **Public no-login verifier that fails closed** lets any reviewer confirm or refute a payout claim without trusting the project
- **Reproducibility package** lets a reviewer rebuild and re-verify the system from a cold start — see [12 — Verification and Reproducibility](12-verification-and-reproducibility.md)
- **Public GitHub repository** enables SCF technical reviewers to audit code quality at any time
- **LGU-ready report** is structured with RA 9003 and EPR Act reporting in mind; no LGU or DENR office has reviewed or approved the format
- **Carbon avoidance estimates** establish an off-chain baseline for a future carbon credit application; they are project estimates derived from published per-material factors, not measurements
- **[P] Conditional — 10+ household pilots** would demonstrate real-world demand and community adoption readiness. This enabler depends on consent and onboarding completion and is not required by any sprint acceptance criterion.

## UN SDG Alignment Summary

The Agency column lists the Philippine bodies whose mandates the contribution is relevant to. It does not indicate contact, review, endorsement or partnership — see [14 §14.6](14-data-and-authorization-policy.md#146-institutional-references).

| SDG | Goal Title | JuanaBin PH Contribution | Relevant Agency Mandate |
| --- | --- | --- | --- |
| 11 | Sustainable Cities & Communities | Smart waste bins in barangays reduce urban landfill overflow and create cleaner, data-driven communities via on-chain records structured for RA 9003 reporting. | DILG, MMDA, LGU |
| 12 | Responsible Consumption & Production | Converts PET bottles, sachets, and food waste into artisan goods, closing the circular economy loop (relevant to EPR Act reporting). | DTI, DOST, EMB-DENR |
| 13 | Climate Action | Estimates and reports per-household carbon savings off-chain from published per-material factors (PET ~3 kg CO²e/kg, Sachet ~2 kg CO²e/kg, Organic ~0.5 kg CO²e/kg). <!-- TODO: cite the source of these per-material CO²e factors --> | DENR, CCC-PH, DOST |
| 8 | Decent Work & Economic Growth | Creates dignified livelihood for waste collectors, artisan weavers, and compost processors through transparent blockchain rewards. PHP 500–2,000/month per household is a project projection, not a measured result. | DOLE, DTI, DSWD |
