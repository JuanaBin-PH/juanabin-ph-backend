<div align="center">

  <img src="https://raw.githubusercontent.com/JuanaBin-PH/juanabin-ph-backend/main/assets/juanabin-logo.png" alt="JuanaBin Logo" width="120" />

  # JuanaBin PH — Backend API & IoT Hub

  ### **AI-Powered Smart Waste Segregation & Rewards Ecosystem on Stellar**
  *Automating proper waste disposal, incentivizing circular economy, and powering green communities across the Philippines.*

  [![Status](https://img.shields.io/badge/Status-Alpha%20v1.0-orange.svg)](#)
  [![Python](https://img.shields.io/badge/Python-v3.12-3776AB.svg?logo=python&logoColor=white)](https://www.python.org/)
  [![Framework](https://img.shields.io/badge/Framework-FastAPI%200.100+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Blockchain](https://img.shields.io/badge/Blockchain-Stellar%20Testnet-14B6E7.svg?logo=stellar&logoColor=white)](https://www.stellar.org/)
  [![Database](https://img.shields.io/badge/Database-PostgreSQL%2017-4169E1.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
  [![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

</div>

<p align="center">
  <a href="#-about-juanabin-ph">About JuanaBin</a> •
  <a href="#-core-backend-features">Core Features</a> •
  <a href="#%EF%B8%8F-hardware--software-integration-specifications">Hardware Specs</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-api-documentation">API Documentation</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-team--leadership">Team</a>
</p>

---

> [!IMPORTANT]
> **JuanaBin PH Backend is in active development (Alpha Testnet Phase).** 
> The system connects camera-based waste classification endpoints with hardware servo controls, FastAPI endpoints, PostgreSQL data persistence, and automated Stellar Horizon Testnet reward token anchoring (`JBIN`).

---

## 🌿 About JuanaBin PH

**JuanaBin PH** is an IoT-enabled, AI-powered smart waste segregation system built specifically for Philippine communities, LGUs, schools, and commercial spaces. By combining computer vision and sensor telemetry with Python FastAPI and Stellar blockchain micro-rewards, JuanaBin automatically identifies waste types (`biodegradable`, `recyclable_paper`, `recyclable_plastic`), controls motorized bin flaps, and rewards users with redeemable points and on-chain tokens.

* **Official Website:** [https://juliesoriano2026.wixsite.com/juanabin-ph](https://juliesoriano2026.wixsite.com/juanabin-ph)
* **Frontend Repository:** React + Tailwind Application (connected via REST API)

### Why JuanaBin? (Impact & Feasibility Data)
* **LGU Cost Reduction:** A single LGU like Pasig City generates ~23,959 tons of garbage yearly. JuanaBin’s automated sorting dramatically reduces contamination and hauling costs, helping save up to **₱59,800/day** per collection network.
* **Circular Economy:** Automated segregation channels PET plastics and recyclables directly into upcycled products (furniture, eco-bricks).
* **Gamification & Micro-Incentives:** Users earn points for correct disposal which can be converted to convenience store credits, digital cash, or anchored on the Stellar Horizon Testnet.

---

## ⚡ Core Backend Features

* **📷 Computer Vision Payload Receiver:** Ingests classification payload and image frames from bin-mounted camera units for processing.
* **🤖 Servo & Lid Actuation Gateway:** Sends real-time signals to hardware microcontrollers (Raspberry Pi/ESP32) to trigger specific compartment doors upon valid classification.
* **💰 Segregate-to-Earn Rewards Engine:** Calculates user points based on material weight and category, manages ledger balance, and anchors payouts transparently on-chain.
* **🌌 Stellar Horizon Integration:** Automatically provisions wallets and submits token transfer operations on the Stellar Horizon Testnet.
* **📊 Data-Driven Insights & Analytics:** Collects bin fill-level telemetry, waste type metrics, and location-based usage reports for LGU dashboards.
* **🔊 Audio & Guidance Webhook:** Triggers contextual voice prompts on physical bin speakers to guide users during disposal.

---

## ⚙️ Hardware & Software Integration Specifications

| Component | Technology / Spec | Function |
| :--- | :--- | :--- |
| **Microcontroller / SBC** | Raspberry Pi / ESP32 | Bin controller unit & network interface |
| **Actuators** | High-torque Servo Motors | Opens individual compartment lids on demand |
| **Sensors & Vision** | Camera Module, Ultrasonic Sensors | Scans waste type & monitors bin fill level |
| **Backend Runtime** | Python 3.12 + FastAPI + Uvicorn | Core REST API, business services, and database integration |
| **Database & ORM** | PostgreSQL 17 + SQLAlchemy 2.x + Alembic | Persistent storage for users, events, rewards, and schema migrations |
| **Blockchain Engine** | Stellar SDK (`stellar-sdk`) | Horizon Testnet wallet funding & transaction validation |
| **Power System Support** | Car Battery / DC Converter / Solar | Designed for mobile and outdoor LGU placement |

---

## 🏗 System Architecture

### Processing & Layer Flow

```
+-----------------------+         +-----------------------+         +-----------------------+
|  Hardware & Sensors   |  HTTP/  |   FastAPI Backend     |  Query  | PostgreSQL 17         |
| (Camera, Servos, IoT) +-------->+  (Python 3.12 Service) +-------->+ (Docker Container)    |
+-----------------------+  MQTT   +-----------+-----------+         +-----------------------+
                                              |
                                              v
                                  +-----------------------+
                                  | Stellar Horizon       |
                                  | Testnet Blockchain    |
                                  +-----------------------+
```

### Modular Layer Structure
```
Route (app/api/v1) ---> Service (app/services) ---> Repository (app/repositories) ---> SQLAlchemy 2.x ORM
```

---

## 📁 Repository Directory Structure

```
app/
  main.py                  FastAPI application instance, CORS & error handling
  core/
    config.py              Pydantic-settings environment configuration
    security.py            Kinde authentication interface
  db/
    session.py             Engine, SessionLocal, Base, get_db dependency
  models/                  SQLAlchemy 2.x typed ORM models
    officer.py  waste_event.py  reward.py  stellar_transaction.py
  schemas/                 Pydantic v2 request/response models
  repositories/            Data access repositories (one module per aggregate)
  services/                Business rules (points calculation, Stellar Horizon validation)
  api/
    deps.py                Shared FastAPI dependencies
    v1/
      router.py            Mounts all v1 endpoint routers under /api/v1
      endpoints/           officers, waste_events, rewards, stellar, health
tests/                     pytest suite (SQLite in-memory with DI overrides)
alembic/
  versions/                Schema migration scripts (Source of Truth)
alembic.ini
Dockerfile
docker-compose.yml         PostgreSQL + FastAPI services setup
```

---

## 📖 API Documentation Overview

> 💡 **Interactive Swagger UI:** Available locally at [http://localhost:8000/docs](http://localhost:8000/docs) (or port `8001` when running FastAPI natively).

| Method | Endpoint | Description | Auth / Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server Liveness check | Public |
| `GET` | `/api/v1/health/db` | Database Readiness check (`SELECT 1`) | Public |
| `GET` | `/api/v1/officers` | List all registered officers | API Key / Auth |
| `POST` | `/api/v1/officers` | Register new field officer | Admin |
| `GET` | `/api/v1/waste-events` | List recorded waste intake events | API Key / Auth |
| `POST` | `/api/v1/waste-events` | Submit waste image/weight payload & earn points | Bin / API Key |
| `GET` | `/api/v1/rewards` | Query officer reward points balance | Bearer Token |
| `POST` | `/api/v1/rewards` | Issue manual/custom reward credit | Admin |
| `GET` | `/api/v1/stellar/transactions/{id}`| Fetch on-chain Stellar transaction log | Public / Auth |
| `POST` | `/api/v1/stellar/validate` | Validate transaction hash against Horizon Testnet | Public / Auth |

---

## 🎯 Points Calculation Rules

Points are awarded per full 100 grams, weighted by waste category (`app/services/waste_event.py`):

| Waste Category | Points per 100 g |
| :--- | :--- |
| `biodegradable` | 10 pts |
| `recyclable_paper` | 20 pts |
| `recyclable_plastic` | 30 pts |

---

## 🚀 Getting Started

Follow these step-by-step instructions to set up and run the JuanaBin backend server locally.

### Prerequisites
* **Python**: `v3.12`
* **Docker Desktop**: Installed and running (PostgreSQL runs in Docker)
* **Shell**: Windows PowerShell

### 1. Clone & Setup Virtual Environment

```powershell
git clone https://github.com/JuanaBin-PH/juanabin-ph-backend.git
cd juanabin-ph-backend

# Create and activate virtual environment
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Environment Setup

```powershell
Copy-Item .env.example .env
```

### 4. Start PostgreSQL Container

```powershell
docker compose up -d postgres
```

### 5. Run Database Migrations

```powershell
alembic upgrade head
```

### 6. Start Development Server

```powershell
uvicorn app.main:app --reload --port 8000
```
*Access API Docs at `http://localhost:8000/docs`.*

### 7. Run Tests

```powershell
pytest
```

---

## 🗺️ 30-Day Instawards Project Roadmap

- [x] **Milestone 1:** Stellar Testnet Wallet Provisioning & JBIN Asset Deployment.
- [x] **Milestone 2:** Segregate-to-Earn Business Logic & Payout Engine Implementation.
- [ ] **Milestone 3:** Live Community Pilot Demo Dashboard & Public On-Chain Verification.
- [ ] **Milestone 4:** Mainnet Deployment & Soroban Smart Contract Automation.

---

## 👥 Core Team & Leadership

* **Julie Ann Soriano** — CEO / Founder
* **Jealyn Caldona** — Operations Manager
* **An Bulaoro** — Finance Manager (CPA)
* **Terence Louis Espedilla** — Development Product Manager
* **Joel Sta. Ana** — Mechanical Engineer
* **Engr. Bhai Nhuraisha I. Diplomo** — Adviser (MSECE/MSICT)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.