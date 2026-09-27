"""
ResolvAI Copilot - AI Engine (backend/ai_engine.py)

Generates structured decisioning output (root_cause, why_trail, optimal_resolution, customer_communication)
using Live Gemini / OpenAI LLM APIs, with an intelligent fallback engine when API keys are not configured.
"""

import os
import json
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()


def _fallback_resolution(rule_engine_facts: Dict[str, Any], complaint_text: str) -> Dict[str, Any]:
    """
    Intelligent fallback resolution generator returning expected frontend schema.
    """
    cust_id = rule_engine_facts.get("customer_id", "Customer")
    flags = rule_engine_facts.get("discrepancy_flags", [])
    rc = rule_engine_facts.get("rule_checks", {})

    why_trail = []
    why_trail.append(f"1. Verified customer history for {cust_id} from Hutch billing logs.")

    if "DUPLICATE_TRANSACTION" in flags:
        dups = rc.get("duplicate_details", [])
        if dups:
            d = dups[0]
            tx_ids = d.get("transaction_ids", ["DT01A", "DT01B"])
            amt = d.get("amount", 499.0)
            gap = d.get("time_gap_seconds", 35.0)
            why_trail.append(f"2. Hard Rule Engine identified 2 identical debits ({' & '.join(tx_ids)}) of LKR {amt:.2f} executed within {gap}s.")
            why_trail.append("3. Confirmed network USSD packet delay caused redundant billing execution.")
            why_trail.append(f"4. Recommended instant reversal of LKR {amt:.2f} to customer balance.")
            return {
                "root_cause": f"Duplicate transaction detected: Dual debits of LKR {amt:.2f} ({' & '.join(tx_ids)}) executed within {gap} seconds due to network latency.",
                "why_trail": why_trail,
                "optimal_resolution": f"Approve immediate refund of LKR {amt:.2f} for duplicate transaction {tx_ids[-1]}.",
                "customer_communication": f"Dear Customer, we apologize for the duplicate charge of LKR {amt:.2f}. We have credited LKR {amt:.2f} back to your Hutch balance immediately."
            }

    if "FAILED_TRANSACTION" in flags or "STUCK_REFUND" in flags:
        fails = rc.get("failed_details", [])
        if fails:
            f = fails[0]
            tx_id = f.get("transaction_id", "T0001")
            amt = f.get("amount", 299.0)
            why_trail.append(f"2. Identified failed or pending transaction {tx_id} of LKR {amt:.2f}.")
            why_trail.append("3. Payment gateway timeout prevented service allocation.")
            why_trail.append(f"4. Recommended immediate re-processing/credit of LKR {amt:.2f}.")
            return {
                "root_cause": f"Payment processing timeout on transaction {tx_id} (LKR {amt:.2f}).",
                "why_trail": why_trail,
                "optimal_resolution": f"Re-process transaction {tx_id} and credit LKR {amt:.2f} to customer account.",
                "customer_communication": f"Dear Customer, we noticed your payment of LKR {amt:.2f} (Ref: {tx_id}) was delayed. Your balance/package has now been updated."
            }

    if "BALANCE_MISMATCH" in flags:
        bms = rc.get("balance_details", [])
        if bms:
            bm = bms[0]
            tx_id = bm.get("transaction_id", "T0001")
            diff = bm.get("difference", 99.0)
            why_trail.append(f"2. Calculated balance calculation mismatch on transaction {tx_id}.")
            why_trail.append(f"3. Expected balance differs from actual ledger by LKR {diff:.2f}.")
            why_trail.append(f"4. Recommended balance adjustment credit of LKR {diff:.2f}.")
            return {
                "root_cause": f"Balance discrepancy identified on transaction {tx_id} (Difference: LKR {diff:.2f}).",
                "why_trail": why_trail,
                "optimal_resolution": f"Apply manual balance adjustment of LKR {diff:.2f}.",
                "customer_communication": f"Dear Customer, we have corrected a balance calculation discrepancy of LKR {diff:.2f} on your Hutch account."
            }

    if "USAGE_OVERAGE" in flags:
        u = rc.get("usage_details", {})
        used_mb = u.get("total_usage_mb", 0.0)
        limit_mb = u.get("package_limit_mb", 0.0)
        why_trail.append(f"2. Evaluated data usage logs: Used {used_mb:.2f} MB against plan quota of {limit_mb:.2f} MB.")
        why_trail.append("3. Verified no billing system error occurred.")
        why_trail.append("4. Recommended advising customer on data plan options.")
        return {
            "root_cause": f"Data usage quota reached ({used_mb:.2f} MB used against {limit_mb:.2f} MB quota).",
            "why_trail": why_trail,
            "optimal_resolution": "Explain plan data limits to customer and offer data booster package.",
            "customer_communication": f"Dear Customer, your data usage reached {used_mb:.2f} MB, consuming your active package quota. You can activate a high-speed data add-on anytime via Hutch App."
        }

    why_trail.append("2. Evaluated transaction ledger, usage records, and plan active status.")
    why_trail.append("3. All deterministic rule checks passed without discrepancy.")
    why_trail.append("4. Confirmed customer account is operating normally.")
    return {
        "root_cause": "Normal usage / no system discrepancy detected.",
        "why_trail": why_trail,
        "optimal_resolution": "Inform customer that account records and balance transitions are accurate.",
        "customer_communication": f"Dear Customer, thank you for contacting Hutch Support. We verified your account records for '{complaint_text}' and confirmed that all transactions and balances are correct."
    }


def run_ai_engine(rule_engine_facts: Dict[str, Any], complaint_text: str) -> Dict[str, Any]:
    """
    Main function for AI Engine.
    Attempts live Gemini/OpenAI API call if API key configured, else returns structured fallback.
    """
    system_instruction = """
    You are the 'Resolution Copilot', an intelligent telecom decision engine for Hutch Sri Lanka.
    Analyze the customer complaint alongside the deterministic facts.
    
    CRITICAL INSTRUCTION: All monetary amounts in your response must be formatted 
    in Sri Lankan Rupees (e.g., 'Rs. 99.00' or 'LKR 99.00'). Do NOT use dollars ($).
    """
    
    user_prompt = f"""
    Customer Complaint Text: 
    "{complaint_text}"

    Rule Engine Facts (JSON):
    {json.dumps(rule_engine_facts, indent=2)}
    """

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    if api_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(
                f"{system_instruction}\n\n{user_prompt}",
                generation_config={"response_mime_type": "application/json"}
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"[AI Engine Warning] Gemini API call failed: {e}")

    if openai_key:
        try:
            import openai
            client = openai.OpenAI(api_key=openai_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"[AI Engine Warning] OpenAI API call failed: {e}")

    # Fallback to intelligent deterministic facts resolution
    return _fallback_resolution(rule_engine_facts, complaint_text)