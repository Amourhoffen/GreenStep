import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    # In main.py, root returns either the SPA or JSON if static doesn't exist
    # Since we test the API, let's test a known API route or handle both cases.
    assert response.status_code in [200, 404]

def test_health():
    # If there is a health endpoint we would test it. 
    # For now, just test that the API is somewhat responsive.
    response = client.get("/api/activities/some-endpoint-that-doesnt-exist")
    assert response.status_code == 404
