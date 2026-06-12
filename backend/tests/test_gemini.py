import pytest
from unittest.mock import patch, MagicMock
import os
import sys

# Add parent directory to path to import services
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.gemini_service import calculate_co2, generate_rag_response

@pytest.mark.asyncio
async def test_calculate_co2_mocked():
    """Test calculate CO2 prompt and response parsing"""
    with patch('services.gemini_service.get_text_model') as mock_get_model:
        mock_model = MagicMock()
        mock_response = MagicMock()
        mock_response.text = '{"co2_kg": 5.5, "calculation_method": "test", "equivalent_trees_monthly": 1, "confidence": "high", "breakdown": "test", "reduction_tip": "test"}'
        mock_model.generate_content.return_value = mock_response
        mock_get_model.return_value = mock_model
        
        result = await calculate_co2("driving", "transport", {"distance": 10})
        
        assert "co2_kg" in result
        assert result["co2_kg"] == 5.5
        mock_model.generate_content.assert_called_once()

@pytest.mark.asyncio
async def test_calculate_co2_fallback():
    """Test analyze activity fallback on bad JSON"""
    with patch('services.gemini_service.get_text_model') as mock_get_model:
        mock_model = MagicMock()
        mock_response = MagicMock()
        mock_response.text = 'Not a JSON object'
        mock_model.generate_content.return_value = mock_response
        mock_get_model.return_value = mock_model
        
        result = await calculate_co2("driving", "transport", {"distance": 10})
        
        # It should hit the except block and return a fallback
        assert "co2_kg" in result
        assert result["co2_kg"] == 0.0 # Default

@pytest.mark.asyncio
async def test_generate_rag_response():
    """Test RAG chat advice response"""
    with patch('services.gemini_service.get_text_model') as mock_get_model:
        mock_model = MagicMock()
        mock_response = MagicMock()
        mock_response.text = "You should turn off lights to save energy."
        mock_model.generate_content.return_value = mock_response
        mock_get_model.return_value = mock_model
        
        advice = await generate_rag_response("How can I save energy?", "Context data")
        
        assert "turn off lights" in advice
        mock_model.generate_content.assert_called_once()
