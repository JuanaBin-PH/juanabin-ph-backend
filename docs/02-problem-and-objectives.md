---
title: Problem Statement & Objectives
section: "02"
source_pages: [4, 5]
---

# 02 — Problem Statement & Objectives

## 3.1 Problem Statement

The Philippines generates approximately **15 million tonnes** of solid waste per year, of which roughly **9 million tonnes** are mismanaged — dumped, burned, or left uncollected. <!-- TODO: cite sources for the 15M and 9M tonne figures --> Despite the Ecological Solid Waste Management Act (RA 9003), household-level waste segregation compliance remains critically low across Metro Manila barangays. In August 2026, three structural barriers continue to drive this failure:

| # | Barrier | Impact |
| --- | --- | --- |
| 1 | **No Economic Incentive** | Households bear the cost and effort of segregation with zero financial return. Informal waste pickers earn income; residents do not. This creates a systematic free-rider problem that cannot be solved by education campaigns alone. |
| 2 | **No Transparency / Trust** | LGU collection programs lack accountability. Households cannot verify whether their segregated waste is correctly processed. Distrust reduces participation rates even in communities where willingness to segregate exists. |
| 3 | **Financial Exclusion** | 51 million Filipinos are unbanked as of 2026. <!-- TODO: cite source for the 51M figure --> Reward programs requiring bank accounts, e-wallets, or government IDs exclude the communities that most need economic support from waste recovery activities. |

## 3.2 Root Cause

> **Absence of a low-cost, blockchain-based micro-reward mechanism** that can pay PHP 5 per segregation event sustainably. Ethereum/Solana transaction fees make this economically impossible. Stellar makes it viable at $0.00001/transaction — the only chain where micro-rewards work at Philippine barangay scale. No existing system links household waste behavior to a Stellar wallet, preventing financial inclusion through environmental action. LGU waste dashboards rely on self-reported data — there is no on-chain, tamper-proof record of per-household waste diversion that regulators and auditors can verify.

## 3.3 Objectives

The 30-day sprint scope (August 31 – September 29, 2026) is structured around six discrete, verifiable objectives, each linked directly to a sprint deliverable. Every objective is satisfiable by engineering work alone; none is gated on participant recruitment.

| # | Objective | 30-Day Deliverable Link |
| --- | --- | --- |
| O1 | Provision Stellar wallets for unbanked Filipino households via Kinde authentication | **Deliverable 1** Wallet + Reward Token System (JBIN on Stellar Testnet) |
| O2 | Build and deploy JBIN token reward logic tied to verified waste segregation events | **Deliverable 2** Segregate-to-Earn Logic Engine |
| O3 | Create a transparent, auditable on-chain record of waste diversion accessible to LGUs and DILG | **D2 & D3** Admin Dashboard with Stellar Explorer links |
| O4 | Demonstrate the end-to-end earn flow — signup, qualifying submission, on-chain settlement, public verification — with test wallets, and with pilot households where onboarding completes | **Deliverable 3** Dashboard + Public Verifier |
| O5 | Produce open-source infrastructure replicable by any Philippine barangay on Stellar | **GitHub** Public repo — MIT licensed, documented, deployable |
| O6 | Prove the system is reproducible and independently verifiable from a cold start | **Deliverable 4** Reproducibility & Evidence Package |
