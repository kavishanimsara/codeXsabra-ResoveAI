# ⚙️ ResolvAI Backend Engine (`backend/`)

> **FastAPI Microservice + Pandas Rule Engine + LLM Decisioning Module**

The backend module ingests multi-source telecom datasets, evaluates hard business rules deterministically, and synthesizes explainable resolution packages via LLM APIs.

---

## 🏗️ Module Overview

```
backend/
├── main.py              # FastAPI server, route definitions & CORS setup
├── rule_engine.py       # Deterministic rule checks (duplicates, failures, mismatches, overage)
├── ai_engine.py         # Gemini/OpenAI API integration with fallback decision generator
├── data_summarizer.py   # Pandas context compression and fact aggregator
└── README.md            # Backend technical documentation
```

---

## 🔍 Core Modules Explained

### 1. `rule_engine.py` — Deterministic Hard Rules
Evaluates telecom transaction ledgers and usage logs against 4 hard rules:
- **Rule 1: Duplicate Transaction Detection**: Flags customer debits with identical amounts and transaction types executed within 120 seconds.
- **Rule 2: Failed Transaction / Missing Refund**: Flags transactions with status `Failed` or `Pending` refunds.
- **Rule 3: Balance Mismatch Detection**: Compares expected balance transitions (`balance_before +/- amount`) against actual `balance_after`.
- **Rule 4: Usage Overage Detection**: Checks total data usage (`data_mb`) against active package quotas.

### 2. `ai_engine.py` — Intelligent Decisioning Engine
- Invokes **Google Gemini 1.5 Flash** or **OpenAI GPT-4o-mini** to deduce natural language root causes, why-trails, optimal resolutions, and customer communications.
- Formats all monetary values in Sri Lankan Rupees (`LKR` / `Rs.`).
- Features a deterministic fallback engine when API keys are not set.

### 3. `data_summarizer.py` — Context Compression Architecture
- Aggregates raw CSV datasets into a dense JSON summary.
- Prevents LLM context limit bloat and math hallucinations by feeding exact Pandas mathematical facts to the AI engine.

### 4. `main.py` — FastAPI REST API Router
- Hosts endpoints supporting both relative Vite proxy requests and direct cross-origin calls (`CORS`).
- Pre-indexes datasets for fast sub-second scenario building and response delivery.

---

## ⚡ API Endpoint Specification

### `GET /health` | `GET /api/health`
Checks backend service health and reports dataset load statistics.
```json
{
  "status": "ok",
  "version": "1.0.0",
  "message": "ResolvAI FastAPI Backend Live",
  "datasets_loaded": {
    "transactions": 50010,
    "usage": 30000,
    "packages": 8,
    "complaints": 1200,
    "customers": 5000
  }
}
```

### `GET /scenarios` | `GET /api/scenarios`
Returns pre-processed customer scenarios for all active complaints in `complaints.csv`.
```json
[
  {
    "id": "C03619",
    "phone": "+94 78 762 2462",
    "region": "Northern",
    "customerType": "Postpaid",
    "ticket": {
      "id": "CP000001",
      "loggedTime": "10 mins ago",
      "channel": "Mobile App",
      "text": "I activated the Hutch 30-Day Unlimited Data Pack...",
      "category": "Package"
    },
    "primaryAnomaly": "FAILED_TRANSACTION",
    "affectedAmount": 99.0,
    "whyTrail": [...],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Re-process transaction T0006369 and credit LKR 99.00...",
      "amount": 99.0
    }
  }
]
```

### `POST /analyze-complaint` | `POST /api/analyze-complaint`
Runs the rule engine and AI engine for a given customer ID and complaint text payload.
```json
// Request Body
{
  "customer_id": "C03619",
  "complaint_text": "I activated the Hutch data pack..."
}
```

### `POST /resolve` | `POST /api/resolve`
Records an account credit resolution and returns a unique digital receipt ID.
```json
// Request Body
{
  "customer_id": "C03619",
  "amount": 99.0,
  "resolution_type": "REFUND",
  "notes": "Approved via ResolvAI Copilot"
}

// Response Body
{
  "status": "SUCCESS",
  "receipt_id": "HTC-REC-A1B2C3D4",
  "timestamp": "2026-09-27 19:30:00",
  "adjusted_amount": 99.0,
  "customer_id": "C03619"
}
```

---

## 🧪 Testing Backend Endpoints

Run backend test suite:
```bash
python scratch/test_main_endpoints.py
```
Or run uvicorn server directly:
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
