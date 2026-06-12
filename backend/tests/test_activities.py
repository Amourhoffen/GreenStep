import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_save_activity():
    # Test the /api/activities/save endpoint
    payload = {
        "category": "transport",
        "activity_type": "driving",
        "co2_kg": 2.5
    }
    response = client.post("/api/activities/save", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "saved"
    assert "id" in data

def test_calculate_co2_missing_fields():
    # Test missing category
    payload = {
        "activity_type": "driving"
    }
    response = client.post("/api/activities/calculate-co2", json=payload)
    assert response.status_code == 422 # Validation error from Pydantic
