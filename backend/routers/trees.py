"""Trees router — Gemini Vision tree analysis"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from services.gemini_service import analyze_tree_photo
from services.weather_service import get_weather_data

router = APIRouter()


class TreeAnalysisRequest(BaseModel):
    image_base64: str
    location: str
    temperature_c: Optional[float] = None
    humidity_pct: Optional[float] = None
    rainfall_mm_year: Optional[float] = None


@router.post("/analyze")
async def analyze_tree(req: TreeAnalysisRequest):
    """Analyze tree photo with Gemini Vision + OpenWeather climate data."""
    temp = req.temperature_c
    humidity = req.humidity_pct
    rainfall = req.rainfall_mm_year

    # Fetch live weather if not provided
    if temp is None or humidity is None:
        try:
            city = req.location.split(",")[0].strip()
            weather = await get_weather_data(city)
            temp = weather.get("temperature_c", 30)
            humidity = weather.get("humidity_pct", 65)
            rainfall = weather.get("rainfall_mm_year", 1000)
        except Exception:
            temp, humidity, rainfall = 30, 65, 1000

    # Try Gemini first, fallback to Hugging Face Vision (Qwen-VL)
    try:
        from services.gemini_service import GENAI_AVAILABLE
        if GENAI_AVAILABLE:
            result = await analyze_tree_photo(
                image_base64=req.image_base64,
                location=req.location,
                temperature_c=temp,
                humidity_pct=humidity,
                rainfall_mm_year=rainfall,
            )
            # Check if Gemini actually returned a real result or its internal fallback
            if result.get("confidence_pct", 0) > 0:
                return result
    except Exception:
        pass
        
    # Fallback to HuggingFace Vision
    try:
        from services.hf_service import analyze_tree_photo_hf
        return await analyze_tree_photo_hf(
            image_base64=req.image_base64,
            location=req.location,
            temperature_c=temp,
            humidity_pct=humidity,
            rainfall_mm_year=rainfall,
        )
    except Exception as e:
        # Final safe fallback if both fail
        from services.gemini_service import _default_tree_response
        return _default_tree_response(error=str(e))


@router.post("/save")
async def save_tree(tree: Dict[str, Any]):
    return {"status": "saved", "id": tree.get("id", "demo")}
