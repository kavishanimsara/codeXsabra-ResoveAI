import os
import json 
from typing import Dict, Any
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key="AQ.Ab8RN6JWXPylZzPkDPdhSBSSWKhHTQ-tENdXZsd_4uLJUtAqDQ")

def run_ai_engine(rule_engine_facts: Dict[str, Any], complaint_text: str) -> Dict[str, Any]:
    
    system_instruction = """
    You are the 'Resolution Copilot', an intelligent telecom decision engine.
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

    response_schema = {
        "type": "OBJECT",
        "properties": {
            "root_cause": {"type": "STRING"},
            "why_trail": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            },
            "optimal_resolution": {"type": "STRING"},
            "customer_communication": {"type": "STRING"}
        },
        "required": ["root_cause", "why_trail", "optimal_resolution", "customer_communication"]
    }

    try: 
        resopnse = client.models.generate_content(
            model = 'gemini-3.8-flash',
            contents = user_prompt,
            config = types.GenerateContentConfig(
                system_instruction = system_instruction,
                response_mime_type = "application/json",
                response_schema = response_schema,
                temperature = 0.2
            )
        )

        return json.loads(resopnse.text)

    except Exception as e:
        return{
            'error': 'LLM API connection failed',
            'details': str(e)
        }