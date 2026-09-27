"""
ResolvAI Copilot - Backend API (backend/main.py)

FastAPI Server connecting Pandas Rule Engine and Gemini/OpenAI AI Engine.
Supports both /analyze-complaint and /api/diagnose/{customer_id} contracts with CORS enabled.
"""

import os
import sys
import uuid
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

# Ensure backend modules are importable
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.rule_engine import run_rule_engine
from backend.ai_engine import run_ai_engine

# Initialize FastAPI App
app = FastAPI(
    title="ResolvAI Copilot API",
    description="Automated Telecom Customer Resolution API combining Pandas Rule Engine and LLM Decisioning.",
    version="1.0.0"
)

# Enable CORS for Frontend UI (Port 3000, Vite Proxy, and direct calls)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV Datasets with absolute paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
transactions_df = pd.read_csv(os.path.join(BASE_DIR, "transactions.csv"))
usage_df = pd.read_csv(os.path.join(BASE_DIR, "usage.csv"))
packages_df = pd.read_csv(os.path.join(BASE_DIR, "packages.csv"))
complaints_df = pd.read_csv(os.path.join(BASE_DIR, "complaints.csv"))
customers_df = pd.read_csv(os.path.join(BASE_DIR, "customers.csv"))

# Pre-index datasets for fast lookups
tx_by_cust = dict(list(transactions_df.groupby('customer_id'))) if 'customer_id' in transactions_df.columns else {}
us_by_cust = dict(list(usage_df.groupby('customer_id'))) if 'customer_id' in usage_df.columns else {}
cust_dict = customers_df.set_index('customer_id').to_dict('index') if 'customer_id' in customers_df.columns else {}

NAMES_FIRST = ['Kasun', 'Dinithi', 'Nuwan', 'Chamari', 'Kusal', 'Anura', 'Pathum', 'Dhananjaya', 'Dilshan', 'Maheesh', 'Wanindu', 'Lahiru', 'Ramesh', 'Charith', 'Avishka', 'Sadeera', 'Dunith', 'Niroshan', 'Bhanuka', 'Isuru']
NAMES_LAST = ['Jayasuriya', 'Perera', 'Fernando', 'Atapattu', 'Mendis', 'Kumara', 'Nissanka', 'de Silva', 'Madushanka', 'Theekshana', 'Hasaranga', 'Asalanka', 'Shanaka', 'Samarawickrama', 'Wellalage', 'Vandersay', 'Gunathilaka', 'Dickwella', 'Rajapaksa', 'Senanayake']

KNOWN_NAMES = {
    'C00001': 'Kasun Jayasuriya',
    'C04694': 'Dinithi Perera',
    'C01102': 'Nuwan Fernando',
    'C00892': 'Chamari Atapattu'
}

AVATARS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80'
]


class ComplaintRequest(BaseModel):
    customer_id: str
    complaint_text: Optional[str] = ""


class ResolveRequest(BaseModel):
    customer_id: str
    resolution_type: Optional[str] = "REFUND"
    amount: Optional[float] = 0.0
    notes: Optional[str] = ""


def generate_customer_scenarios(limit: int = 100):
    import hashlib
    scenarios = []

    stages = ["DETECT", "ANALYZE", "DECIDE", "ACT"]
    badge_colors = [
        "bg-red-50 text-red-700 border-red-200",
        "bg-amber-50 text-amber-700 border-amber-200",
        "bg-indigo-50 text-indigo-700 border-indigo-200",
        "bg-emerald-50 text-emerald-700 border-emerald-200"
    ]

    for idx, row in complaints_df.head(limit).iterrows():
        cid = str(row['customer_id'])
        c_info = cust_dict.get(cid, {})
        h_val = int(hashlib.md5(cid.encode()).hexdigest(), 16)

        name = KNOWN_NAMES.get(cid, f"{NAMES_FIRST[h_val % len(NAMES_FIRST)]} {NAMES_LAST[(h_val // 7) % len(NAMES_LAST)]}")
        phone = f"+94 78 {(h_val % 800) + 100:03d} {(h_val % 8000) + 1000:04d}"
        avatar = AVATARS[h_val % len(AVATARS)]

        ctx = tx_by_cust.get(cid, pd.DataFrame())
        cus = us_by_cust.get(cid, pd.DataFrame())

        facts = run_rule_engine(cid, ctx, cus, packages_df)

        flags = facts.get('discrepancy_flags', [])
        primary_anomaly = flags[0] if flags else 'NORMAL'
        rc = facts.get('rule_checks', {})
        
        affected_amount = 499.0
        if rc.get('duplicate_details'):
            affected_amount = float(rc['duplicate_details'][0].get('amount', 499.0))
        elif rc.get('failed_details'):
            affected_amount = float(rc['failed_details'][0].get('amount', 299.0))
        elif rc.get('balance_details'):
            affected_amount = float(rc['balance_details'][0].get('difference', 99.0))

        tx_list = []
        if not ctx.empty:
            for _, t in ctx.head(10).iterrows():
                st = str(t.get('status', '')).strip()
                is_anom = st.lower() in ['failed', 'pending'] or (primary_anomaly == 'DUPLICATE_TRANSACTION' and float(t.get('amount', 0)) == affected_amount)
                tx_list.append({
                    'id': str(t.get('transaction_id', '')),
                    'time': str(t.get('timestamp', '')),
                    'type': str(t.get('transaction_type', '')),
                    'amount': float(t.get('amount', 0)),
                    'status': st,
                    'method': str(t.get('payment_method', '')),
                    'balanceBefore': float(t.get('balance_before', 0)),
                    'balanceAfter': float(t.get('balance_after', 0)),
                    'isAnomaly': is_anom,
                    'tag': 'ANOMALY' if is_anom else 'VERIFIED'
                })

        current_balance = tx_list[-1]['balanceAfter'] if tx_list else 850.0

        tot_mb = float(cus['data_mb'].sum()) if not cus.empty else 1495.5
        tot_min = float(cus['voice_minutes'].sum()) if not cus.empty else 51.3
        tot_sms = int(cus['sms_count'].sum()) if not cus.empty else 16
        quota_mb = 10240.0
        pct = round((tot_mb / quota_mb) * 100, 1)

        plan_name = f"Hutch {c_info.get('plan_id', 'Smart 599')}"
        complaint_text = str(row.get('complaint_text', ''))

        # Run AI resolution engine to get root cause, why trail, optimal resolution
        ai_res = run_ai_engine(facts, complaint_text)

        why_trail = []
        raw_why = ai_res.get("why_trail", [])
        for idx_w, step_text in enumerate(raw_why):
            st_name = stages[idx_w] if idx_w < len(stages) else "INFO"
            b_color = badge_colors[idx_w] if idx_w < len(badge_colors) else "bg-slate-50 text-slate-700 border-slate-200"
            st_title = (
                f"Core Discrepancy: {primary_anomaly.replace('_', ' ')}" if idx_w == 0
                else "Network Gateway & Ledger Audit" if idx_w == 1
                else "Deterministic AI Decision" if idx_w == 2
                else "Reconciliation & Safeguard Action"
            )
            why_trail.append({
                "stage": st_name,
                "badgeColor": b_color,
                "title": st_title,
                "detail": step_text
            })

        recommended_action = {
            "type": "REFUND" if primary_anomaly == "DUPLICATE_TRANSACTION" else "ADJUSTMENT",
            "label": ai_res.get("optimal_resolution", f"Approve Reconcile LKR {affected_amount:.2f}"),
            "amount": affected_amount,
            "description": ai_res.get("root_cause", f"Direct credit to customer account to resolve {primary_anomaly}.")
        }

        scenarios.append({
            'id': cid,
            'name': name,
            'phone': phone,
            'region': str(c_info.get('region', 'Northern')),
            'customerType': str(c_info.get('customer_type', 'Prepaid')),
            'planId': str(c_info.get('plan_id', 'Smart 599')),
            'planName': plan_name,
            'registrationDate': str(c_info.get('registration_date', '2025-01-01')),
            'preferredChannel': str(c_info.get('preferred_channel', 'Call Center')),
            'currentBalance': current_balance,
            'avatar': avatar,
            'ticket': {
                'id': str(row.get('complaint_id', '')),
                'loggedTime': '10 mins ago',
                'channel': str(row.get('channel', 'Call Center')),
                'status': str(row.get('status', 'Investigating')),
                'text': complaint_text,
                'category': str(row.get('category', 'Billing Dispute')),
                'groundTruth': str(row.get('ground_truth_root_cause', 'Discrepancy detected'))
            },
            'primaryAnomaly': primary_anomaly,
            'severity': 'CRITICAL' if primary_anomaly == 'DUPLICATE_TRANSACTION' else ('HIGH' if primary_anomaly == 'FAILED_TRANSACTION' else 'MEDIUM'),
            'confidenceScore': facts.get('confidence_score', 0.95),
            'affectedAmount': affected_amount,
            'whyTrail': why_trail,
            'recommendedAction': recommended_action,
            'aiRootCause': ai_res.get("root_cause", ""),
            'aiCustomerCommunication': ai_res.get("customer_communication", ""),
            'usage': {
                'totalDataMb': tot_mb,
                'quotaMb': quota_mb,
                'percentUsed': pct,
                'voiceMin': tot_min,
                'sms': tot_sms,
                'packageLimit': '10.0 GB'
            },
            'transactions': tx_list
        })
    return scenarios


# Cache generated scenarios
CACHED_SCENARIOS = None

def get_cached_scenarios():
    global CACHED_SCENARIOS
    if CACHED_SCENARIOS is None:
        CACHED_SCENARIOS = generate_customer_scenarios(limit=100)
    return CACHED_SCENARIOS


@app.get("/")
@app.get("/health")
@app.get("/api")
@app.get("/api/")
@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "version": "1.0.0",
        "message": "ResolvAI FastAPI Backend Live",
        "datasets_loaded": {
            "transactions": len(transactions_df),
            "usage": len(usage_df),
            "packages": len(packages_df),
            "complaints": len(complaints_df),
            "customers": len(customers_df)
        }
    }


@app.get("/scenarios")
@app.get("/api/scenarios")
@app.get("/customers")
@app.get("/api/customers")
def fetch_scenarios_endpoint():
    return get_cached_scenarios()



def _process_analysis(customer_id: str, complaint_text: Optional[str] = "") -> Dict[str, Any]:
    customer_id = str(customer_id).strip()

    # Find complaint text if missing
    if not complaint_text:
        match_c = complaints_df[complaints_df['customer_id'] == customer_id]
        if not match_c.empty:
            complaint_text = str(match_c.iloc[0]['complaint_text'])
        else:
            complaint_text = "Customer reported an account or billing discrepancy."

    # Run Rule Engine
    facts = run_rule_engine(
        customer_id=customer_id,
        transactions_df=transactions_df,
        usage_df=usage_df,
        packages_df=packages_df
    )

    # Run AI Engine
    ai_resolution = run_ai_engine(
        rule_engine_facts=facts,
        complaint_text=complaint_text
    )

    return {
        "customer_id": customer_id,
        "rule_engine_data": facts,
        "ai_analysis": ai_resolution
    }


@app.post("/analyze-complaint")
@app.post("/api/analyze-complaint")
def analyze_complaint(payload: ComplaintRequest):
    return _process_analysis(payload.customer_id, payload.complaint_text)


@app.post("/api/diagnose/{customer_id}")
def diagnose_customer(customer_id: str):
    analysis = _process_analysis(customer_id)
    facts = analysis["rule_engine_data"]
    ai = analysis["ai_analysis"]

    flags = facts.get("discrepancy_flags", [])
    primary_anomaly = flags[0] if flags else "NORMAL"
    rc = facts.get("rule_checks", {})
    dup = rc.get("duplicate_details", [{}])[0]
    affected_amount = dup.get("amount", 0.0)

    # Formatted why trail
    why_steps = []
    why_raw = ai.get("why_trail", [])
    stages = ["DETECT", "ANALYZE", "DECIDE", "ACT"]

    for idx, text in enumerate(why_raw):
        stage = stages[idx] if idx < len(stages) else "INFO"
        why_steps.append({
            "stage": stage,
            "title": f"Step {idx + 1}",
            "detail": text
        })

    return {
        "customer_id": customer_id,
        "primary_anomaly": primary_anomaly,
        "discrepancy_flags": flags,
        "confidence_score": facts.get("confidence_score", 0.95),
        "affected_amount": affected_amount,
        "why_trail": why_steps,
        "action_recommendation": {
            "type": "REFUND" if primary_anomaly == "DUPLICATE_TRANSACTION" else "ADJUSTMENT",
            "label": ai.get("optimal_resolution", "Approve Resolution"),
            "amount": affected_amount,
            "reason": ai.get("root_cause", "Discrepancy identified")
        },
        "rule_checks": rc
    }


@app.post("/resolve")
@app.post("/api/resolve")
def execute_resolution(payload: ResolveRequest):
    receipt_id = f"HTC-REC-{uuid.uuid4().hex[:8].upper()}"
    return {
        "status": "SUCCESS",
        "receipt_id": receipt_id,
        "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S"),
        "adjusted_amount": payload.amount or 0.0,
        "customer_id": payload.customer_id,
        "message": f"Resolution successfully recorded. Receipt ID: {receipt_id}"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)