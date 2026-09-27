# 🕵️‍♂️ HUTCH ResolvAI — Multi-Source Resolution Copilot
> **IgnitX Telecom Hackathon 2026 — Track 4.1.1: Resolution Copilot**
> *Turning complex multi-source telecom data into instant, deterministic, and explainable customer resolutions.*

---

## 🎯 Executive Overview

Customer support agents at Hutch Sri Lanka spend 5–10 minutes per inquiry manually cross-referencing ledger entries across 3+ fragmented network systems (HLR Mediation, Billing Gateway, Usage Metering). This creates high average handling times (AHT), agent fatigue, and customer dissatisfaction due to billing disputes.

**ResolvAI Copilot** automates telecom resolution using a **Context Compression Hybrid Architecture**:
1. **Pandas Deterministic Rule Engine**: Instantly audits 50,000+ transactions and usage logs to identify mathematical discrepancies (duplicates, gateway failures, balance calculation errors, quota overages).
2. **LLM Decisioning Engine**: Generates human-readable root-cause explanations and customer-facing communications formatted in Sri Lankan Rupees (`LKR`).
3. **High-Fidelity React UI**: Provides customer support agents with a 1-click resolution hub, explainable 4-stage why-trails, digital trust receipts, and bilingual SMS dispatch previews.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph data_layer [Data Layer]
        C[complaints.csv]
        CU[customers.csv]
        T[transactions.csv]
        U[usage.csv]
        P[packages.csv]
    end

    subgraph backend [Backend Engine (FastAPI)]
        RE[Pandas Rule Engine]
        AI["Gemini / OpenAI AI Engine"]
        API["FastAPI Router /api/scenarios"]
    end

    subgraph frontend [Frontend Application (React + Vite)]
        UI["Priority Queue & Customer Viewer"]
        AC[1-Click Resolution Hub]
        TR[Digital Trust Receipt Modal]
    end

    C & CU & T & U & P --> RE
    RE -- Fact Payload --> AI
    RE & AI --> API
    API <--> UI
    UI --> AC --> TR
```
## 🛠️ Tech Stack & Key Modules

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Backend Framework** | FastAPI (Python 3.10+) | Asynchronous API router, CORS enabled, Pydantic validation |
| **Data Processing** | Pandas, NumPy | Sub-second multi-source ledger auditing, duplicate detection |
| **AI / LLM** | Google Gemini 1.5 Flash / GPT-4o-mini | Natural language root cause deduction, bilingual SMS generation |
| **Frontend UI** | React 18, Vite 5 | Reactive state, component-driven UI, zero visual lag |
| **Styling & Motion** | Tailwind CSS, Framer Motion | Hutch brand identity (`#FF5500`), smooth 3D modal transitions |
| **Icons & FX** | Lucide React, Canvas Confetti | Modern UI icons, resolution celebration effects |

---

## 📁 Repository Structure

```
d:\codeXsabra-ResoveAI\
├── backend/
│   ├── main.py                  # FastAPI server & route handlers
│   ├── rule_engine.py           # Hard rule-based anomaly detector
│   ├── ai_engine.py             # Gemini/OpenAI decisioning engine
│   ├── data_summarizer.py       # Context compression summarizer
│   └── README.md                # Backend technical documentation
├── frontend/
│   ├── src/
│   │   ├── components/          # UI components (Header, Queue, Dispute, ActionCenter)
│   │   ├── services/            # API adapter service (apiService.js)
│   │   ├── App.jsx              # Main application view & state management
│   │   └── main.jsx             # React entry point
│   ├── package.json             # Node dependencies
│   ├── vite.config.js           # Vite dev server & API proxy config
│   └── README.md                # Frontend technical documentation
├── data/
│   ├── complaints.csv           # 1,200 incoming customer complaint records
│   ├── customers.csv            # 5,000 customer demographic profiles
│   ├── transactions.csv         # 50,010 transaction ledger records
│   ├── usage.csv                # 30,000 data/voice/SMS usage logs
│   ├── packages.csv             # Tariff package definitions
│   └── README.md                # Dataset specification & schema guide
├── docs/
│   ├── API_CONTRACT_FRONTEND.md # Frontend-backend API specification
│   └── README.md                # Documentation overview
└── README.md                    # Project root documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- Optional: `GEMINI_API_KEY` or `OPENAI_API_KEY` set in `.env`

---

### Step 1: Launch FastAPI Backend

```bash
# Navigate to backend and install requirements
pip install fastapi uvicorn pandas numpy python-dotenv google-generativeai pydantic

# Run FastAPI backend server (Port 8000)
python backend/main.py
```
*Backend live at `http://127.0.0.1:8000` with interactive API docs at `http://127.0.0.1:8000/docs`.*

---

### Step 2: Launch React Frontend UI

```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Run Vite dev server (Port 3000)
npm run dev
```
*Open `http://localhost:3000` in your browser.*

---

## ⚡ Core API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/health` or `/api/health` | `GET` | Backend health status and dataset load count |
| `/scenarios` or `/api/scenarios` | `GET` | Returns list of real customer scenarios with rule/AI findings |
| `/analyze-complaint` or `/api/analyze-complaint` | `POST` | Runs Rule Engine and AI Engine for a target customer ID |
| `/resolve` or `/api/resolve` | `POST` | Executes account credit adjustment and returns Digital Trust Receipt |

---

## 🏆 Key Demonstration Highlights

1. **Multi-Complaint Customer View**: Search or select any Customer ID (`C03619`, `C00001`, `C04694`) to view all complaints filed by that line.
2. **Explainable Why-Trail**: Step-by-step audit breakdown showing **Detect**, **Analyze**, **Decide**, and **Act**.
3. **1-Click Resolution Hub**: Execute instant account credit adjustments in LKR with celebration feedback.
4. **Digital Trust Receipt**: Customer-facing audit receipt with bilingual SMS preview (English / සිංහල).
