<div align="center">

  <img src="https://raw.githubusercontent.com/JuanaBin-PH/juanabin-ph-backend/main/assets/juanabin-logo.png" alt="JuanaBin Logo" width="120" />

  # JuanaBin PH

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

## 🧩 Why JuanaBin PH

Municipal solid waste management in Philippine LGUs and urban communities faces critical challenges due to improper waste segregation at source, high hauling costs, and low public participation. Traditional waste collection relies on manual sorting at transfer stations, leading to high contamination rates of recyclable materials and swelling landfill volumes.

JuanaBin PH solves this gap by integrating IoT-enabled smart physical bins, real-time computer vision classification, and automated blockchain reward settlement into a unified system. Instead of fragmented manual bin inspections and delayed incentive programs, JuanaBin automates waste identification, flap actuation, point scoring, and transparent reward token anchoring on the Stellar network.

---

## 🔁 The JuanaBin Operating Loop

`Scan Payload → Actuate Servo → Calculate Points → Anchor Token`

| Capability | What it helps you do | Status |
| :--- | :--- | :--- |
| **Computer Vision Ingestion** | Ingest waste image frames and inference payloads from physical bin sensors | Implemented (Alpha) |
| **Hardware Lid Actuation** | Signal microcontrollers (Raspberry Pi/ESP32) to open specific bin flaps | Implemented (Alpha) |
| **Segregate-to-Earn Engine** | Calculate points based on material weight and category rules | Implemented (Alpha) |
| **Stellar Token Anchoring** | Provision testnet wallets and dispatch `JBIN` reward transactions on Stellar Horizon | Implemented (Alpha) |
| **LGU Telemetry Analytics** | Aggregate fill levels and waste metrics for municipal monitoring dashboards | In Progress |
| **Audio Guidance Webhook** | Trigger physical speaker voice prompts to guide user disposal | Planned |

---

## ✨ What You Can Do Today

* **Ingest Waste Classification Payloads:** Receive camera frame inferences and material categories (`biodegradable`, `recyclable_paper`, `recyclable_plastic`) via REST endpoints.
* **Trigger Hardware Lid Actuation:** Send real-time control signals to Raspberry Pi or ESP32 microcontrollers to open target bin compartments.
* **Calculate Automated Reward Balances:** Award points dynamically based on waste category weights (e.g., 30 points per 100g for plastics).
* **Provision & Fund Stellar Testnet Wallets:** Generate and fund non-custodial Stellar Testnet keypairs for field officers and users.
* **Anchor Rewards on Stellar Horizon:** Validate and record reward transfer transactions transparently on the Stellar Horizon Testnet.
* **Manage PostgreSQL Data Persistence:** Track officers, intake events, reward points, and transaction hashes via SQLAlchemy 2.x ORM and Alembic migrations.

---

## 🌐 How JuanaBin Uses Stellar Horizon

| Capability | How JuanaBin uses it today |
| :--- | :--- |
| **Wallet Provisioning** | Automatically generates non-custodial keypairs and requests initial testnet funding via Friendbot |
| **Token Transfer & Anchoring** | Dispatches custom reward transactions (`JBIN` tokens) for verified waste disposal events |
| **Immutable Proof Layer** | Validates transaction hashes against Stellar Horizon to serve as auditable proof of community recycling effort |

---

## 💡 Innovation and Differentiation

> [!NOTE]
> ### Impact & Feasibility Data
> * **LGU Cost Reduction:** A single LGU like Pasig City generates ~23,959 tons of garbage yearly. JuanaBin’s automated sorting dramatically reduces contamination and hauling costs, helping save up to **₱59,800/day** per collection network.
> * **Circular Economy:** Automated segregation channels PET plastics and recyclables directly into upcycled products (furniture, eco-bricks).
> * **Gamification & Micro-Incentives:** Users earn points for correct disposal which can be converted to convenience store credits, digital cash, or anchored on the Stellar Horizon Testnet.

---

## 👥 Who JuanaBin Is For

* **Local Government Units (LGUs):** Municipalities seeking to lower landfill hauling fees, monitor barangay compliance, and digitize waste telemetry.
* **Schools and Universities:** Campus green initiatives aiming to encourage student recycling through instant rewards.
* **Commercial Establishments & Malls:** High-foot-traffic venues wanting automated segregation and branded sustainability metrics.
* **Waste Management Operators & Materials Recovery Facilities (MRFs):** Facilities receiving cleaner, pre-sorted recyclables for efficient processing.
* **Barangay Communities:** Residents incentivized to segregate household waste through redeemable points and digital tokens.

---

## ⚙️ Hardware & Software Stack

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

## 🏗️ System Architecture

```text
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

`Layer Structure: Route (app/api/v1) ---> Service (app/services) ---> Repository (app/repositories) ---> SQLAlchemy 2.x ORM`

---

## 📦 Repository Map

```text
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

## 📖 API Documentation

> 💡 **Interactive Swagger UI Documentation:** Available locally at [http://localhost:8000/docs](http://localhost:8000/docs) (or port `8001` when running FastAPI natively).

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

## 🚀 Run JuanaBin Locally

### Prerequisites
* **Python**: `v3.12`
* **Docker Desktop**: Installed and running (PostgreSQL runs in Docker)
* **Shell**: Windows PowerShell

### 1. Clone & set up the virtual environment
Clone the repository and initialize a Python 3.12 virtual environment:

```powershell
git clone https://github.com/JuanaBin-PH/juanabin-ph-backend.git
cd juanabin-ph-backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2. Install dependencies
Install required Python packages into the active virtual environment:

```powershell
pip install -r requirements.txt
```

### 3. Configure environment variables
Copy the template configuration file to create your local `.env`:

```powershell
Copy-Item .env.example .env
```

### 4. Start the PostgreSQL container
Spin up the database container using Docker Compose:

```powershell
docker compose up -d postgres
```

### 5. Run database migrations
Apply Alembic database migrations to bring the PostgreSQL schema to the latest version:

```powershell
alembic upgrade head
```

### 6. Start the development server
Launch the Uvicorn ASGI server with live reloading enabled:

```powershell
uvicorn app.main:app --reload --port 8000
```

### 7. Run tests
Execute the automated pytest suite using in-memory SQLite dependency overrides:

```powershell
pytest
```

---

## 🗺️ Roadmap and Upcoming Features

Roadmap items describe current direction and may change based on community feedback, hardware availability, and partnership developments.

- [x] **Milestone 1:** Stellar Testnet Wallet Provisioning & JBIN Asset Deployment.
- [x] **Milestone 2:** Segregate-to-Earn Business Logic & Payout Engine Implementation.
- [ ] **Milestone 3:** Live Community Pilot Demo Dashboard & Public On-Chain Verification.
- [ ] **Milestone 4:** Mainnet Deployment & Soroban Smart Contract Automation.

---

## ⚠️ Alpha Boundaries

* **Testnet Scope:** Reward payouts and token anchoring operate strictly on the Stellar Horizon **Testnet** (not Mainnet).
* **Hardware Connectivity:** Servo flap actuation commands assume an active Raspberry Pi/ESP32 microcontroller listening on the local network.
* **Authentication Mode:** Kinde authentication interface is driven by environment flags and defaults to local dev mode (`KINDE_AUTH_ENABLED=false`).
* **Database Isolation:** PostgreSQL is required for development/production execution and is containerized via Docker Compose.

---

## 👥 Core Team & Leadership

* **Julie Ann Soriano** — CEO / Founder
* **Jealyn Caldona** — Operations Manager
* **An Bulaoro** — Finance Manager (CPA)
* **Terence Louis Espedilla** — Development Product Manager
* **Joel Sta. Ana** — Mechanical Engineer
* **Engr. Bhai Nhuraisha I. Diplomo** — Adviser (MSECE/MSICT)

---

## 🤝 Contributing

Contributions are welcome! Please ensure all code additions maintain modular layer separation (`Route -> Service -> Repository`), include tests where applicable, and pass the existing pytest suite prior to submitting a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.