---
title: Verification and Reproducibility
section: "12"
source_pages: []
---

# 12 — Verification and Reproducibility

<!-- Provenance: this section is not transcribed from the submission PDF. It was added in response to SCF reviewer guidance (August 2026), which requires a published reproducibility path covering repository URL, commit/tag, build instructions, environment-variable template, contract IDs, network configuration, test commands, and a step-by-step verification guide. -->

This section lets a reviewer reproduce the build from a cold start and independently verify a JBIN reward payment without trusting any claim made elsewhere in this repository.

Placeholders marked `<...>` are filled in during the sprint as each artifact is produced. No value in this file is provisional or illustrative — an empty placeholder means the artifact does not exist yet.

## 12.1 Repository and Revision

| Field | Value |
| --- | --- |
| Repository | `https://github.com/BusloBuilders/juanabin-ph` <!-- TODO: resolve which URL is authoritative. This value is transcribed from source PDF p.20. The configured git remote for this working tree is https://github.com/JuanaBin-PH/JuanaBin-PH.git — a different owner and repository name. Confirm which repository is public and will be submitted, then make this row, README.md and docs/08 agree. A reviewer who cannot clone the URL printed here cannot verify anything below it. -->
| Submission tag | `<TAG>` <!-- TODO: set at Sep 29, 2026 submission --> |
| Submission commit SHA | `<COMMIT_SHA>` <!-- TODO: set at Sep 29, 2026 submission --> |
| License | MIT (see `LICENSE`) |

## 12.2 Stellar Asset Identity

JBIN is a Stellar **classic custom asset**, not a Soroban contract, so the identity that a reviewer resolves is the asset code plus issuer account rather than a contract ID. See [13 — Tech Stack and Deployment](13-tech-stack-and-deployment.md) for why this primitive was chosen and how it maps onto contract-based acceptance criteria.

| Field | Value |
| --- | --- |
| Asset code | `JBIN` |
| Issuer account (public key) | `<ISSUER_PUBLIC_KEY>` <!-- TODO: fill from Week 1, Aug 31 – Sep 6 --> |
| Distribution account (public key) | `<DISTRIBUTOR_PUBLIC_KEY>` <!-- TODO: fill from Week 1 --> |
| Asset identifier | `JBIN-<ISSUER_PUBLIC_KEY>` |
| Issuance transaction hash | `<ISSUANCE_TX_HASH>` <!-- TODO: fill from Week 1 --> |
| Asset page | `https://stellar.expert/explorer/testnet/asset/JBIN-<ISSUER_PUBLIC_KEY>` |

Secret seeds for both accounts are held outside this repository. They appear in no file, no commit, and no CI log. See [14 — Data and Authorization Policy](14-data-and-authorization-policy.md) for custody.

## 12.3 Network Configuration

| Field | Value |
| --- | --- |
| Network | Stellar **Testnet** |
| Horizon endpoint | `https://horizon-testnet.stellar.org` |
| Network passphrase | `Test SDF Network ; September 2015` |
| Friendbot (test funding) | `https://friendbot.stellar.org?addr=<PUBLIC_KEY>` |
| Explorer | `https://stellar.expert/explorer/testnet/` |

A reviewer checking a hash against Mainnet will get the `WRONG_NETWORK` state described in [11 — Test Plan](11-test-plan.md#114-verifier-states-d3). That is correct behaviour, not a fault.

## 12.4 Build From a Cold Start

```bash
git clone https://github.com/BusloBuilders/juanabin-ph.git
cd juanabin-ph
git checkout <TAG>

python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env             # then fill in the values described below
```

## 12.5 Environment Variables

`.env.example` in the repository root is the authoritative template. It contains variable names and empty values only — never a key.

| Variable | Purpose | Required to run tests? |
| --- | --- | --- |
| `STELLAR_NETWORK` | `testnet` — selects Horizon endpoint and passphrase | Yes |
| `HORIZON_URL` | Horizon endpoint override | No |
| `JBIN_ASSET_CODE` | `JBIN` | Yes |
| `JBIN_ISSUER_PUBLIC_KEY` | Issuer public key (safe to publish) | Yes |
| `JBIN_DISTRIBUTOR_PUBLIC_KEY` | Distribution account public key (safe to publish) | Yes |
| `JBIN_DISTRIBUTOR_SECRET` | Distribution account seed — **host environment only** | Only for live-dispatch tests |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `KINDE_DOMAIN`, `KINDE_CLIENT_ID`, `KINDE_CLIENT_SECRET` | Authentication | For provisioning tests |
| `SUBMITTER_ALLOWLIST` | Comma-separated authorized submitter IDs | Yes |
| `DAILY_CAP_JBIN` | `60` | Yes |

Fixture-backed tests run without `JBIN_DISTRIBUTOR_SECRET`. Only the live-dispatch subset requires it.

## 12.6 Test Commands

```bash
pytest                                    # full suite
pytest -m "not live"                      # fixture-only, no network, no secrets
pytest tests/test_negative_paths.py -v    # the 11 cases in section 11.3
pytest tests/test_verifier_states.py -v   # the 6 states in section 11.4
```

| Field | Value |
| --- | --- |
| CI workflow | `.github/workflows/ci.yml` |
| Passing CI run | `<CI_RUN_URL>` <!-- TODO: fill from Week 2, Sep 7–13 --> |

## 12.7 Step-by-Step Verification Guide

A reviewer can confirm an end-to-end reward payment without running any code:

1. Open the asset page at `https://stellar.expert/explorer/testnet/asset/JBIN-<ISSUER_PUBLIC_KEY>`. Confirm the asset exists, the issuer matches §12.2, and the supply is non-zero.
2. Open the issuance transaction `<ISSUANCE_TX_HASH>`. Confirm it is a payment of JBIN from the issuer to the distribution account. For a classic asset this payment **is** the issuance; there is no separate creation operation.
3. Open the distribution account page. Confirm it holds a JBIN balance and that its outgoing payments are the reward payouts.
4. Pick any reward transaction from the list in §12.8. Confirm: the asset is JBIN, the source is the distribution account, and the amount is one of `6`, `4`, `2` — the per-item rates in [11 — Test Plan](11-test-plan.md#111-material-class-enum).
5. Read that transaction's memo. Confirm it carries a material class code and an event hash, and no personal data.
6. Paste the same transaction hash into the public verifier at `<VERIFIER_URL>`. Confirm it returns `VALID` and that the displayed class and amount match what the explorer shows.
7. Paste a Mainnet transaction hash into the verifier. Confirm it returns `WRONG_NETWORK` rather than `VALID` or a blank result.
8. Paste a well-formed but unrecorded hash. Confirm it returns `UNKNOWN`.
9. Open the CI run at `<CI_RUN_URL>`. Confirm the suite is green and that the negative-path tests in §11.3 are present and passing.

Steps 7 and 8 exist because a verifier that only confirms valid inputs proves nothing. What matters is that it refuses to certify anything it cannot prove.

## 12.8 Evidence Index

| Artifact | Location |
| --- | --- |
| Complete reward transaction list | `<TRANSACTION_LIST_URL>` <!-- TODO: CSV committed at submission --> |
| Admin dashboard | `<DASHBOARD_URL>` <!-- TODO: fill from Week 3, Sep 14–20 --> |
| Public verifier | `<VERIFIER_URL>` <!-- TODO: fill from Week 3 --> |
| Demo video (3–5 min) | `<VIDEO_URL>` <!-- TODO: fill from Week 4, Sep 21–27 --> |
| LGU volume report | `<LGU_REPORT_PATH>` <!-- TODO: fill from Week 4 --> |
| Commit history | `https://github.com/BusloBuilders/juanabin-ph/commits/main` |
