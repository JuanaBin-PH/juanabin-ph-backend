---
title: Tech Stack and Deployment
section: "13"
source_pages: []
---

# 13 — Tech Stack and Deployment

<!-- Provenance: this section is not transcribed from the submission PDF. It records the stack and deployment schedule for the August 31 - September 29, 2026 sprint, and answers the SCF reviewer guidance (August 2026) requiring build instructions, network configuration and a reproducibility path. -->

## 13.1 Why a Classic Asset and Not a Soroban Contract

JBIN is a Stellar **classic custom asset** — an issuing account, a distribution account, and trustlines. It is not a Soroban smart contract, and that is a deliberate choice rather than a gap.

The sprint's on-chain requirement is to move a fixed reward amount to a household wallet and leave a permanent, publicly auditable record of it. A classic payment does exactly that. The logic that decides *whether* a throw earns points — class validation, the daily cap, duplicate rejection — needs a database, a submitter allowlist and mutable configuration, none of which a contract improves within a 30-day window. Adding Soroban would introduce contract deployment, upgrade and audit surface without changing what a reviewer can verify.

The reviewer's suggested acceptance criteria are written for contract-based projects. They map onto a classic asset as follows, and this repository satisfies the mapped form:

| Contract-based criterion | Classic-asset equivalent | Where evidenced |
| --- | --- | --- |
| Contract source is public | Backend and dispatch source public under MIT | Repository |
| Unit tests pass | `pytest` suite green in CI, including 11 negative cases | [11 — Test Plan](11-test-plan.md) |
| Contract ID and deployment tx hash resolve on Testnet | Asset identifier `JBIN-<ISSUER>` and issuance tx hash resolve on Testnet | [12 §12.2](12-verification-and-reproducibility.md#122-stellar-asset-identity) |
| An allowlisted issuer can issue a credential | An allowlisted submitter can trigger a reward payment | Test H1 |
| A non-allowlisted wallet cannot | A non-allowlisted submitter is rejected with no transaction | Test N1 |

Soroban remains a post-sprint consideration, not a deliverable. See [09 — Next Steps](09-next-steps-roadmap.md).

## 13.2 Sprint Stack

Every choice below is a strict subset of the project's longer-term platform architecture, so nothing built in this sprint is discarded when the platform scales.

| Layer | Choice | Rationale |
| --- | --- | --- |
| Backend | FastAPI (Python) | Required by the Stellar Python SDK dependency in D1/D2; already the project's chosen backend framework |
| Stellar | `stellar-sdk` (Python) + Horizon Testnet | Named in the D1 and D2 acceptance criteria |
| Database | PostgreSQL (managed — Supabase or Neon) | Same engine as the platform architecture; managed free tier avoids provisioning overhead inside a 30-day window |
| Authentication | Kinde | Named in the D1 acceptance criteria |
| Admin dashboard | React + Tailwind CSS | Matches the platform architecture and existing team skills |
| Public verifier | Static HTML + JavaScript reading Horizon directly | No backend and no auth, so there is nothing to secure on the no-login path |
| Officer intake | Mobile-responsive web form | D2 specifies a web form, not a native app |
| Tests / CI | `pytest` + GitHub Actions | Required for the "unit tests pass" criterion |

## 13.3 Explicitly Deferred

Listed so that their absence reads as scope discipline rather than omission. None of these is required by any acceptance criterion in this sprint.

| Deferred | Why not in this sprint |
| --- | --- |
| AWS IoT Core, ECS, S3, CloudFront, SageMaker | D2's intake is a human-completed web form; no device-to-cloud path is in scope |
| MQTT / Mosquitto | Same — no device telemetry layer in scope |
| Redis, Celery, RabbitMQ | 25 reward payments across a 30-day pilot does not require a queue or worker tier |
| YOLOv8, TensorFlow Lite, OpenCV | No automated material classification in scope; class is submitted by an authorized officer |
| Flutter / React Native mobile app | Not required by any deliverable; the web form covers D2 |
| GCash / Maya payment APIs | No fiat off-ramp is built or tested — see `SPRINT.md` out-of-scope list |
| Mapbox / Google Maps | Household location is not collected — see [14 — Data and Authorization Policy](14-data-and-authorization-policy.md) |
| Soroban | See §13.1 |

The bin firmware is out of scope for this sprint and is not part of this repository.

## 13.4 Deployment Schedule

Sprint window: **August 31 – September 29, 2026** (30 calendar days).

| When | What is deployed | Where |
| --- | --- | --- |
| Aug 29–30 (pre-sprint) | Public repository; revised documentation submitted to the Aug 30 feedback round | GitHub |
| Aug 31 – Sep 6 (Week 1) | JBIN issued on Testnet; issuer and distribution accounts; 10 test wallets with trustlines; provisioning module committed | Stellar Testnet via `lab.stellar.org` |
| Sep 7–13 (Week 2) | Reward engine; the 11-case negative-path suite green in CI | Render; GitHub Actions |
| Sep 14–20 (Week 3) | Admin dashboard; no-login public verifier | Vercel; GitHub Pages |
| Sep 21–27 (Week 4) | Redemption on a seeded account; LGU export; demo video; D4 package assembled | — |
| Sep 28–29 (Buffer) | Final QA; evidence submission | SCF forum |

No on-chain artifact is dated before August 31, so all evidence falls inside the sprint window.

## 13.5 Hosting and Cost

| Component | Host | Note |
| --- | --- | --- |
| Reward engine (FastAPI) | Render | Holds `JBIN_DISTRIBUTOR_SECRET` in host environment variables only |
| Admin dashboard | Vercel | Hobby tier |
| Public verifier | GitHub Pages | Served from this repository, tying the live page to auditable source |
| PostgreSQL | Supabase or Neon | Free tier; pauses when idle |

Render's free web-service tier cold-starts in roughly 50 seconds, which would stall the Week 4 walkthrough recording. The paid Starter tier is used for Weeks 3–4 rather than risking the demo. Total infrastructure spend for the sprint is approximately **$7–20 USD** against the **$300** infrastructure line in [06 — Budget Justification](06-budget-justification.md).

## 13.6 Secret Handling

`JBIN_DISTRIBUTOR_SECRET` exists in exactly one place: the Render environment variable store. The issuer seed is held offline and is not present in any deployment environment. Neither seed is committed, echoed into logs, or exposed to CI. `.gitignore` blocks `.env`, `*.pem`, `*.key`, `*.seed`, `issuer_secret*`, `distributor_secret*` and `keypairs/`. Custody and authorization are specified in [14 — Data and Authorization Policy](14-data-and-authorization-policy.md).
