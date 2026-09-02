<div align="center">

  <br />
  <img src="assets/juanabin-logo.png" alt="JuanaBin PH Logo" width="120" />
  
  # JuanaBin PH

  <h3>AI-Powered Smart Waste Segregation & Rewards Ecosystem on Stellar</h3>

  <p><i>Automating proper waste disposal, incentivizing circular economy, and powering green communities across the Philippines.</i></p>

  <p>
    <a href="https://juliesoriano2026.wixsite.com/juanabin-ph"><img src="https://img.shields.io/badge/Status-Alpha_v1.0-orange?style=flat-square" alt="Status" /></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-v3.12-blue?style=flat-square&logo=python&logoColor=white" alt="Python" /></a>
    <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/Framework-FastAPI_0.100+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" /></a>
    <a href="https://www.stellar.org/"><img src="https://img.shields.io/badge/Blockchain-Stellar_Testnet-14B6E7?style=flat-square&logo=stellar&logoColor=white" alt="Stellar" /></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/Database-PostgreSQL_17-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" /></a>
    <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" /></a>
  </p>

  <p>
    <a href="#-why-juanabin-ph">About JuanaBin</a> •
    <a href="#-core-features">Core Features</a> •
    <a href="#-system-architecture--component-flow">Architecture</a> •
    <a href="#-api-endpoints-overview">API Documentation</a> •
    <a href="#-local-setup-windows-powershell">Getting Started</a>
  </p>

  <br />

</div>

> [!IMPORTANT]
> **JuanaBin PH Backend is in active development (Alpha Testnet Phase).** The system connects camera-based waste classification endpoints with hardware servo controls, FastAPI endpoints, PostgreSQL data persistence, and automated Stellar Horizon Testnet reward token anchoring (`JBIN`).

---

## 🧩 Why JuanaBin PH

Municipal solid waste management in Philippine LGUs and urban communities faces critical challenges due to improper waste segregation at source, high hauling costs, and low public participation. Traditional waste collection relies on manual sorting at transfer stations, leading to high contamination rates of recyclable materials and swelling landfill volumes.

**JuanaBin PH** bridges this gap by creating an automated **Segregate-to-Earn** reward ecosystem that transforms waste disposal into a verifiable, incentivized process anchored on the **Stellar Blockchain**.

---

## 🌐 Official Links & Platform Overview

* **Official Website:** [https://juliesoriano2026.wixsite.com/juanabin-ph](https://juliesoriano2026.wixsite.com/juanabin-ph)
* **Frontend Repository:** Available in a separate repository *(React + Tailwind)*.
* **Backend Repository:** FastAPI + PostgreSQL + Stellar SDK *(Current Repository)*.

---

## ✨ Key Features

- **Segregate-to-Earn Reward Engine:** Automated point calculation based on material type (`biodegradable`, `recyclable_paper`, `recyclable_plastic`).
- **Stellar Blockchain Anchoring:** Directly provisions testnet wallets and dispatches reward payouts on the Stellar Testnet.
- **Kinde Authentication:** Identity-first authentication mapping users directly to Stellar wallet addresses.
- **Auditable & Layered Architecture:** Strict separation between API Routes, Business Logic Services, Repositories, and SQLAlchemy ORM.

---

## 🏗️ System Architecture & Component Flow

```text
React frontend  (separate repo, http://localhost:5173)
      |
      v
FastAPI backend  (this repo, :8000)
      |
      +--> PostgreSQL 17   (Docker container: juanabin-postgres)
      |
      +--> Stellar Horizon Testnet
```

### Layered Processing Flow
Request flow is strictly layered — no business logic in route handlers:

```text
Route (api/v1/endpoints) -> Service (services/) -> Repository (repositories/) -> SQLAlchemy
```

Pydantic schemas (`app/schemas/`) are the API contract. SQLAlchemy models (`app/models/`) are never returned directly to clients.

---

## 📁 Project Directory Layout

```text
app/
  main.py                  FastAPI app, CORS, error handler
  core/
    config.py              Pydantic-settings configuration
    security.py            Kinde authentication interface
  db/
    session.py             Engine, SessionLocal, Base, get_db dependency
  models/                  SQLAlchemy 2.x typed ORM models
    officer.py  waste_event.py  reward.py  stellar_transaction.py
  schemas/                 Pydantic v2 request/response models
  repositories/            Data access, one module per aggregate
  services/                Business rules (points calculation, Stellar validation)
  api/
    deps.py                Shared FastAPI dependencies
    v1/
      router.py            Mounts all v1 endpoint routers under /api/v1
      endpoints/           officers, waste_events, rewards, stellar, health
tests/                     pytest suite (SQLite in-memory, DI-overridden)
alembic/
  versions/                Migration scripts — source of truth for the schema
alembic.ini
Dockerfile
docker-entrypoint.sh       Runs `alembic upgrade head`, then uvicorn
docker-compose.yml         postgres + api services
```

---

## 📡 API Endpoints Overview

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Liveness — does not touch the database |
| `GET` | `/api/v1/health` | Liveness (versioned) |
| `GET` | `/api/v1/health/db` | Readiness — `SELECT 1`, returns 503 if the DB is down |
| `GET` | `/api/v1/officers` | List officers |
| `POST` | `/api/v1/officers` | Create an officer |
| `GET` | `/api/v1/officers/{id}` | Get one officer |
| `GET` | `/api/v1/waste-events` | List waste events |
| `POST` | `/api/v1/waste-events` | Record a waste event, assigns points |
| `GET` | `/api/v1/rewards` | List rewards |
| `POST` | `/api/v1/rewards` | Create a reward |
| `GET` | `/api/v1/stellar/transactions/{id}` | Get a stored Stellar transaction |
| `POST` | `/api/v1/stellar/validate?hash=...` | Validate a hash against Horizon Testnet |

> 💡 **Interactive API Documentation:** Interactive Swagger UI documentation is available locally at [http://localhost:8000/docs](http://localhost:8000/docs) (or port `8001` when running FastAPI natively).

### Example Payload: Record Waste Event (`POST /api/v1/waste-events`)

**Request Body:**
```json
{
  "officer_id": 1,
  "waste_type": "recyclable_plastic",
  "weight_grams": 500
}
```

**Response (201 Created):**
```json
{
  "id": 12,
  "officer_id": 1,
  "waste_type": "recyclable_plastic",
  "weight_grams": 500,
  "points_awarded": 150,
  "created_at": "2026-09-02T15:30:00Z"
}
```

---

## ⚙️ Tech Stack

| Concern | Choice |
| :--- | :--- |
| **Language** | Python 3.12 |
| **Web framework** | FastAPI + Uvicorn |
| **ORM** | SQLAlchemy 2.x (typed ORM) |
| **Migrations** | Alembic |
| **Database** | PostgreSQL 17 (Docker only) |
| **DB driver** | psycopg2-binary |
| **Validation** | Pydantic v2 + pydantic-settings |
| **Testing** | pytest |
| **Blockchain** | stellar-sdk (Horizon Testnet) |
| **Auth** | Kinde |
| **Packaging** | Docker / Docker Compose |

---

## 📋 Requirements

- **Python:** 3.12
- **Docker Desktop:** Required (PostgreSQL runs **only** in Docker for this project)
- **Shell:** Windows PowerShell (commands below are PowerShell-native)

---

## 🚀 Local Setup (Windows PowerShell)

### 1. Create and activate the virtual environment

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Confirm the interpreter is the project one:

```powershell
python -c "import sys; print(sys.executable)"
```

*It must print a path ending in `juanabin-ph-backend\.venv\Scripts\python.exe`.*

### 2. Install dependencies

```powershell
pip install -r requirements.txt
```

### 3. Create your `.env`

```powershell
Copy-Item .env.example .env
```

*`.env` is git-ignored and must never be committed.*

### 4. Start PostgreSQL

```powershell
docker compose up -d postgres
docker ps
docker port juanabin-postgres
```

### 5. Apply migrations

```powershell
alembic upgrade head
```

### 6. Run the API

```powershell
uvicorn app.main:app --reload
```

- **API docs:** [http://localhost:8001/docs](http://localhost:8001/docs)
- **Health:** [http://localhost:8001/health](http://localhost:8001/health)

### 7. Run the tests

```powershell
pytest
```

---

## 🔑 Environment Variables

| Variable | Purpose | Local default |
| :--- | :--- | :--- |
| `DATABASE_URL` | SQLAlchemy connection URL | `postgresql+psycopg2://postgres:postgres@127.0.0.1:5432/juanabin` |
| `FRONTEND_URL` | Frontend origin, CORS fallback | `http://localhost:5173` |
| `ALLOWED_ORIGINS` | Comma-separated CORS allow-list (no wildcards) | `http://localhost:5173` |
| `KINDE_AUTH_ENABLED` | Toggle Kinde JWT validation | `false` |
| `KINDE_ISSUER` | Kinde issuer URL | *(empty)* |
| `KINDE_AUDIENCE` | Kinde API audience | `juanabin-ph` |

*`.env.example` documents every variable name and contains no real secrets.*

### Database host: `127.0.0.1` vs `postgres`

This is the single most common source of confusion, so it is configured explicitly in both places:

| Where FastAPI runs | Database host to use | Set in |
| :--- | :--- | :--- |
| Directly on Windows | `127.0.0.1:5432` | `.env` |
| Inside Docker Compose | `postgres:5432` | `docker-compose.yml` (`api.environment`) |

`127.0.0.1` is used rather than `localhost` because this machine has native PostgreSQL installations (`postgresql-x64-14`, `postgresql-x64-18`) that can resolve/bind ambiguously on `localhost`. Inside the backend container, `127.0.0.1` would point at the container itself — never the database — so Compose overrides `DATABASE_URL` with the `postgres` service hostname.

---

## 🐘 PostgreSQL (Docker)

PostgreSQL for this project runs **only** in Docker. If a native Windows PostgreSQL service is holding port 5432, Docker cannot bind it.

### Diagnose port 5432

```powershell
Get-NetTCPConnection -LocalPort 5432 -State Listen |
  Select-Object LocalAddress,LocalPort,State,OwningProcess

Get-Process -Id <PID>

Get-CimInstance Win32_Process -Filter "ProcessId = <PID>" |
  Select-Object ProcessId,Name,ExecutablePath
```

### Inspect the native PostgreSQL services

```powershell
Get-CimInstance Win32_Service |
  Where-Object { $_.Name -like "postgresql*" } |
  Select-Object Name,State,StartMode,PathName
```

### Stop the native service so Docker can own the port

Stop the specific service — do not kill `postgres.exe` directly, as that bypasses the service manager and can leave the data directory in a recovery state.

This requires an elevated (Administrator) PowerShell. In a normal shell you will get *Access is denied / Cannot open postgresql-x64-18 service*. To elevate from your current shell (one UAC prompt to accept):

```powershell
Start-Process powershell -Verb RunAs -ArgumentList '-NoExit','-Command', `
  'Stop-Service -Name postgresql-x64-18 -Force; Set-Service -Name postgresql-x64-18 -StartupType Manual'
```

Or, in a shell already opened via *Run as Administrator*:

```powershell
Stop-Service -Name "postgresql-x64-18" -Force
Set-Service  -Name "postgresql-x64-18" -StartupType Manual   # don't reclaim 5432 on reboot
```

Repeat for any other `postgresql-x64-*` service that is listening. PostgreSQL stays installed — only the service is stopped.

### Alternative: no Administrator rights needed

If you cannot elevate, leave the native service running and move Docker's host-side port instead. Set this in `.env`:

```env
POSTGRES_HOST_PORT=5433
DATABASE_URL=postgresql+psycopg2://postgres:postgres@127.0.0.1:5433/juanabin
```

Then `docker compose up -d postgres` binds host 5433 and no longer collides.

This changes nothing inside Docker: the `api` container reaches the database over the compose network at `postgres:5432`, which never goes through the host port mapping. Only a FastAPI process running directly on Windows needs the 5433 URL.

### Verify Docker owns 5432

```powershell
docker ps
docker port juanabin-postgres
Get-NetTCPConnection -LocalPort 5432 -State Listen |
  Select-Object OwningProcess
```

The owning process should be Docker's (`com.docker.backend` / `vpnkit-bridge`).

### Connection checks

```powershell
python -c "import psycopg2; print('PSYCOPG2 OK')"

python -c "import psycopg2; c=psycopg2.connect('host=127.0.0.1 port=5432 dbname=juanabin user=postgres password=postgres'); print('POSTGRES CONNECTED'); c.close()"

python -c "from app.db.session import engine; c=engine.connect(); print('SQLALCHEMY CONNECTED'); c.close()"
```

### Open a psql shell

```powershell
docker exec -it juanabin-postgres psql -U postgres -d juanabin
```

Then `\dt` should list:
```text
alembic_version
officers
waste_events
rewards
stellar_transactions
```

---

## ⚗️ Alembic

Alembic is the **only** source of truth for the schema. `Base.metadata.create_all()` is never used as a substitute in application code. Credentials are not stored in `alembic.ini` — `alembic/env.py` reads `DATABASE_URL` through `app.core.config.settings`.

```powershell
alembic upgrade head                                    # apply migrations
alembic revision --autogenerate -m "create core tables" # generate a new migration
alembic current                                         # show applied revision
alembic history --verbose                               # list migrations
alembic check                                           # fail if models drift from migrations
alembic downgrade -1                                    # roll back one revision
```

`alembic/env.py` imports `app.models`, which registers every model on `Base.metadata` so autogenerate sees all four tables.

---

## 📊 Data Model

| Table | Purpose | Key columns |
| :--- | :--- | :--- |
| `officers` | Field officers | `name`, `email` (unique) |
| `waste_events` | A waste submission/intake event | `officer_id` → `officers.id`, `waste_type`, `weight_grams`, `points_awarded` |
| `rewards` | Reward points earned by an officer | `officer_id` → `officers.id`, `points`, `reason` |
| `stellar_transactions` | Testnet transaction anchoring a reward | `officer_id` → `officers.id`, `stellar_transaction_hash`, `amount`, `asset_code`, `status` |

> 💡 **Database Constraints:** `waste_type` is constrained at the database level (`waste_type_check`) to: `biodegradable`, `recyclable_paper`, or `recyclable_plastic`.

### Points calculation

Points are awarded per full 100 g, weighted by category (`app/services/waste_event.py`):

| Waste type | Points per 100 g |
| :--- | :--- |
| `biodegradable` | 10 |
| `recyclable_paper` | 20 |
| `recyclable_plastic` | 30 |

---

## 🔐 Authentication (Kinde)

`app/core/security.py` exposes a `KindeAuthProvider` interface that can later validate Kinde JWTs without touching routes or services. It is driven entirely by environment variables:
- `KINDE_AUTH_ENABLED=false` (local default) returns a stub local-dev principal.
- `KINDE_AUTH_ENABLED=true` requires `KINDE_ISSUER` and `KINDE_AUDIENCE`, and is where real JWT signature/claims validation gets implemented.

No Kinde credentials are invented or committed. Routes consume auth through the `app/api/deps.py` dependency, so swapping the implementation is a one-file change.

---

## ⭐ Stellar Integration

All Stellar work is confined to `app/services/stellar.py` — routes never talk to Horizon directly.
- Horizon Testnet only ([https://horizon-testnet.stellar.org](https://horizon-testnet.stellar.org)).
- No mainnet submission.
- No Soroban.

The service validates transaction hashes and XDR payloads, and translates SDK errors into clean application-level `HTTPException`s.

---

## 🧪 Testing

```powershell
pytest              # run everything
pytest -v           # verbose
pytest tests/test_waste_events.py
```

Tests use an in-memory SQLite database injected by overriding the `get_db` dependency (`tests/conftest.py`), so they never touch the Docker database or any production data. Coverage includes the health endpoint, officer create/retrieve, waste-event creation with points assignment, reward retrieval, and Stellar validation.

---

## 🐳 Docker Setup

### Full stack (backend + PostgreSQL) — recommended

Compose wires the two services together, waits for the database healthcheck, and runs migrations before serving:

```powershell
docker compose up -d --build      # build and start postgres + api
docker compose ps                 # status and health
docker compose logs -f api        # follow backend logs
docker compose down               # stop (keeps the data volume)
```

The API is then on `http://localhost:8000` and PostgreSQL on `localhost:5432`.

> ⚠️ `docker compose down -v` would delete the `postgres_data` volume and all data. Use plain `docker compose down` unless you intend to wipe the database.

### PostgreSQL only (running FastAPI on Windows directly)

```powershell
docker compose up -d postgres
```

### Backend image standalone

```powershell
docker build -t juanabin-ph-backend .
docker run --name juanabin-backend -p 8000:8000 --env-file .env juanabin-ph-backend
```

> 💡 **Note:** With `--env-file .env`, `DATABASE_URL` points at `127.0.0.1`, which inside the container is the container itself. For a working standalone run, either use Compose (preferred) or override the host:

```powershell
docker run --name juanabin-backend -p 8000:8000 `
  -e DATABASE_URL="postgresql+psycopg2://postgres:postgres@host.docker.internal:5432/juanabin" `
  juanabin-ph-backend
```

The backend image contains no PostgreSQL — the database is always a separate container.

---

## 📐 Engineering Conventions

- **Modular monolith.** Deferred infrastructure (Redis, Celery, RabbitMQ, AWS, MQTT, Soroban, ML runtimes) stays deferred.
- **Typed Python throughout;** SQLAlchemy 2.x `Mapped[]` / `mapped_column()` only.
- **Dependency injection** for database sessions, so everything is testable.
- **Unhandled exceptions** are logged server-side and returned as an opaque `500 {"detail": "Internal server error"}` — stack traces are never exposed.
- **CORS** is an explicit allow-list from the environment; no `*` in production.
- **Secrets** live in `.env` (git-ignored) and are injected as environment variables.

---

## 🗺️ Project Roadmap

- [x] **Phase 1 (Current):** Core FastAPI Backend & PostgreSQL Schema Setup.
- [x] **Phase 2 (Current):** Stellar Horizon Testnet Integration & Point Calculation Logic.
- [ ] **Phase 3:** Kinde Auth full JWT claim validation & Role-Based Access Control (RBAC).
- [ ] **Phase 4:** Mainnet Deployment & Smart Contract / Soroban Exploration for Automated Reward Distribution.
- [ ] **Phase 5:** Mobile Web App integration for real-time scanning & intake logs.

---

## ✉️ Contact & Support

For questions or inquiries regarding JuanaBin PH backend development, please reach out via our official website or Telegram channel.

---

## 📄 License

This repository is developed for the JuanaBin PH project. All rights reserved.