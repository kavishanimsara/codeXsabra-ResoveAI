# 🔌 ResolvAI Backend Integration Contract (For Member 1 & 2)

This document provides the API specifications expected by the **Member 5 Frontend UI (`frontend/app.py`)** once the backend team finishes `backend/main.py`.

---

## 🚀 How Frontend Connects to Backend
In `frontend/app.py`, there is a sidebar toggle:
* **Standalone Engine (Dataset + Rules):** Operates 100% locally with zero external dependencies.
* **Live FastAPI Backend (http://localhost:8000):** Queries the FastAPI backend endpoints defined below.

---

## 📡 Expected Endpoints

### 1. Health Check
* **Endpoint:** `GET /health`
* **Response (200 OK):**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "message": "ResolvAI FastAPI Backend Live"
}
```

---

### 2. Run Copilot Diagnosis
* **Endpoint:** `POST /api/diagnose/{customer_id}`
* **Path Parameter:** `customer_id` (e.g. `"C00001"`, `"C04694"`)
* **Response (200 OK):**
```json
{
  "customer_id": "C00001",
  "primary_anomaly": "DUPLICATE_TRANSACTION",
  "discrepancy_flags": ["DUPLICATE_TRANSACTION"],
  "confidence_score": 0.96,
  "affected_amount": 499.0,
  "why_trail": [
    {
      "stage": "DETECT",
      "title": "Dual Identical Deductions Identified",
      "detail": "Identified 2 transactions of Rs. 499.00 executed within 35 seconds."
    },
    {
      "stage": "ANALYZE",
      "title": "USSD Gateway Timeout Latency",
      "detail": "Network packet delay occurred between customer USSD session and Hutch Billing Gateway."
    },
    {
      "stage": "DECIDE",
      "title": "High Confidence Inadvertent Deduction (98.4%)",
      "detail": "Second deduction confirmed redundant without corresponding service provisioning."
    },
    {
      "stage": "ACT",
      "title": "Autonomous Balance Credit Adjustment",
      "detail": "Recommend immediate reversal of Rs. 499.00 into customer prepaid balance."
    }
  ],
  "action_recommendation": {
    "type": "REFUND",
    "label": "Approve Immediate Refund of Rs. 499.00",
    "amount": 499.0,
    "reason": "Duplicate transaction due to USSD retry race condition."
  },
  "rule_checks": {
    "duplicates_found": 1,
    "failed_transactions_found": 0,
    "balance_mismatches_found": 0,
    "usage_overage_detected": false
  }
}
```

---

### 3. Execute Resolution
* **Endpoint:** `POST /api/resolve`
* **Request Body:**
```json
{
  "customer_id": "C00001",
  "resolution_type": "REFUND",
  "amount": 499.0,
  "notes": "Approved by Agent #4028"
}
```
* **Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "receipt_id": "HTC-REC-075DBD65",
  "timestamp": "2026-09-27 11:30:00",
  "adjusted_amount": 499.0
}
```
