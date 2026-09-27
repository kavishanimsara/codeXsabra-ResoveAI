from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from typing import Optional
from backend.rule_engine import run_rule_engine
from backend.ai_engine import run_ai_engine

app = FastAPI(title="Resolution Copilot API")

# Load required datasets 
transactions_df = pd.read_csv("data/transactions.csv")
usage_df = pd.read_csv("data/usage.csv")
packages_df = pd.read_csv("data/packages.csv")

class ComplaintRequest(BaseModel):
    customer_id: str
    complaint_text: str

@app.post("/analyze-complaint")
def analyze_complaint(payload: ComplaintRequest):

    # Run the rule engine
    facts = run_rule_engine(
        customer_id = payload.customer_id,
        transactions_df = transactions_df,
        usage_df = usage_df,
        packages_df = packages_df
    )

    # Pass facts and text to the LLM
    ai_resolution = run_ai_engine(
        rule_engine_facts = facts,
        complaint_text = payload.complaint_text
    )

    # Return the complete decision payload
    return {
        "customer_id": payload.customer_id,
        "rule_engine_data": facts,
        "ai_analysis": ai_resolution
    }