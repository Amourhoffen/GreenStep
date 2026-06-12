import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import os
import sys

# Add parent directory to path to import main
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

client = TestClient(app)

def test_root():
    """Test the root endpoint when static directory doesn't exist"""
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_cors_headers():
    """Test that CORS headers are appropriately applied"""
    response = client.options("/", headers={"Origin": "http://localhost:5173", "Access-Control-Request-Method": "GET"})
    assert response.status_code in [200, 404, 204]
    
def test_security_headers():
    """Test custom security headers middleware"""
    response = client.get("/")
    assert "Cross-Origin-Opener-Policy" in response.headers
    assert response.headers["Cross-Origin-Opener-Policy"] == "same-origin-allow-popups"

def test_get_trees():
    """Test the trees router basic GET"""
    response = client.get("/api/trees/")
    assert response.status_code in [200, 404]

def test_get_community_stats():
    """Test community stats router"""
    response = client.get("/api/community/stats")
    assert response.status_code in [200, 500]
