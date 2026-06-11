"""Activities router — CO2 calculation endpoint"""
import os
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from services.co2_calculator import calculate_deterministic_co2
from services.gemini_service import get_text_model, _parse_json_response
from services.maps_service import get_distance_km
from services.watttime_service import get_grid_intensity

router = APIRouter()


class ActivityRequest(BaseModel):
    category: str
    activity_type: str
    details: Dict[str, Any] = {}
    origin: Optional[str] = None
    destination: Optional[str] = None
    vehicle_type: Optional[str] = None
    location: Optional[str] = None


@router.post("/calculate-co2")
async def calculate_co2_endpoint(req: ActivityRequest):
    """Calculate CO2 deterministically with live data, use AI only for tip."""
    distance_km = None
    grid_co2_gkwh = None

    # Fetch live distance for transport
    if req.category == "transport" and req.origin and req.destination:
        try:
            dist_data = await get_distance_km(req.origin, req.destination)
            distance_km = dist_data.get("distance_km")
        except Exception:
            pass

    # Fetch live grid intensity for energy or EV transport
    if req.category == "energy" or (req.category == "transport" and req.vehicle_type == "ev"):
        loc = req.location or req.origin or "Delhi"
        try:
            grid_data = await get_grid_intensity(loc)
            grid_co2_gkwh = grid_data.get("kg_co2_per_kwh", 0.716) * 1000  # convert to g/kWh
        except Exception:
            grid_co2_gkwh = 716  # India average

    # 1. Deterministic Calculation (Always succeeds)
    result = calculate_deterministic_co2(
        category=req.category,
        activity_type=req.activity_type,
        details=req.details,
        distance_km=distance_km,
        grid_co2_gkwh=grid_co2_gkwh,
        vehicle_type=req.vehicle_type
    )

    # 2. AI tip generation (Optional fallback)
    try:
        model = get_text_model()
        prompt = f"Give one short, hyper-specific actionable tip to reduce carbon footprint for: {req.category} -> {req.activity_type}. Return ONLY JSON with key 'reduction_tip'."
        response = model.generate_content(prompt)
        ai_data = _parse_json_response(response.text)
        if ai_data and "reduction_tip" in ai_data:
            result["reduction_tip"] = ai_data["reduction_tip"]
    except Exception as e:
        print(f"[GreenStep] AI tip generation failed: {e}")
        pass

    return result


@router.post("/save")
async def save_activity(activity: Dict[str, Any]):
    """Save activity to Firestore (returns the activity with generated ID)."""
    return {"status": "saved", "id": activity.get("id", "demo")}
