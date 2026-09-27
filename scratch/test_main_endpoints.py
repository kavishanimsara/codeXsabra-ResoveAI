import sys
import os
from fastapi.testclient import TestClient

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from backend.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    print("Health check OK:", data)

def test_scenarios():
    res = client.get("/api/scenarios")
    assert res.status_code == 200
    data = res.json()
    assert len(data) > 0
    first = data[0]
    assert "id" in first
    assert "ticket" in first
    assert "whyTrail" in first
    assert "transactions" in first
    print(f"Scenarios endpoint OK: Received {len(data)} customer scenarios. First customer ID: {first['id']}")

def test_analyze():
    res = client.post("/api/analyze-complaint", json={"customer_id": "C03619"})
    assert res.status_code == 200
    data = res.json()
    assert "rule_engine_data" in data
    assert "ai_analysis" in data
    print("Analyze complaint OK for C03619:", data["rule_engine_data"]["discrepancy_flags"])

if __name__ == "__main__":
    test_health()
    test_scenarios()
    test_analyze()
    print("\nALL ENDPOINT TESTS PASSED SUCCESSFULLY!")
