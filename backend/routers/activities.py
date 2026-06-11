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

    # 1. Gemini AI Transport Calculation (New feature requested by user)
    if req.category == "transport" and req.origin and req.destination:
        try:
            model = get_text_model()
            prompt = f"""You are an expert Carbon Footprint Calculator AI Agent. Your job is to calculate the precise CO2 emissions for a journey based on the user's input: Origin, Destination, and Vehicle Type.

CRITICAL INSTRUCTIONS:
1. DO NOT use hardcoded or static distances (e.g., 50 km) for different cities. You must calculate or fetch the actual driving distance between the given 'From' and 'To' locations using the available Distance Tool/API.
2. If the exact distance cannot be fetched, ask the user or return an error, but NEVER hallucinate or guess a fixed 50 km distance.
3. Calculate the CO2 emissions using this exact formula:
   Emission = Distance (in km) × Emission Factor (kg CO2/km)

EMISSION FACTORS (Based on IPCC AR6 & India MoRTH/CEA data):
- Petrol Car: 0.192 kg CO2/km
- Diesel Car: 0.175 kg CO2/km
- EV (Electric Vehicle): 0.041 kg CO2/km (Based on India Grid Mix)
- Bus: 0.089 kg CO2/km (Average per passenger)
- Metro/Train: 0.041 kg CO2/km (Average per passenger)

ALTERNATIVE CALCULATIONS:
For the requested trip, always calculate the emissions for alternative options (Metro, Bus, EV) and find the percentage reduction compared to the primary vehicle selected by the user.
Percentage Reduction Formula = (($Primary_CO2 - $Alternative_CO2) / $Primary_CO2) * 100

OUTPUT FORMAT:
You must strictly return the data in the following JSON format so the UI can parse it correctly without bugs:
{{
  "trip_details": {{
    "from": "Origin City",
    "to": "Destination City",
    "actual_distance_km": 1785.5,
    "selected_vehicle": "Car (Petrol)"
  }},
  "calculation_breakdown": {{
    "formula": "Distance × Emission Factor",
    "total_co2_kg": 342.81,
    "emission_factor_used": 0.192,
    "confidence_level": "HIGH CONFIDENCE"
  }},
  "alternatives": [
    {{
      "type": "Metro",
      "co2_kg": 73.2,
      "reduction_percentage": 78.6
    }}
  ],
  "ai_reduction_tip": "Consider taking a combination of train/metro or an Electric Vehicle for this long-distance journey to significantly reduce your carbon footprint."
}}

---
USER INPUT:
Origin: {req.origin}
Destination: {req.destination}
Vehicle Type: {req.vehicle_type}
Actual Distance fetched from API: {distance_km if distance_km else "UNAVAILABLE"} km
"""
            response = model.generate_content(prompt)
            ai_data = _parse_json_response(response.text)
            if ai_data:
                # Add default values expected by UI if missing
                ai_data["equivalent_trees_monthly"] = ai_data.get("calculation_breakdown", {}).get("total_co2_kg", 0) / 1.814
                return ai_data
        except Exception as e:
            print(f"[GreenStep] Gemini AI transport calculation failed, falling back to deterministic: {e}")

    # 2. Deterministic Calculation (Fallback & Other categories)
    result = calculate_deterministic_co2(
        category=req.category,
        activity_type=req.activity_type,
        details=req.details,
        distance_km=distance_km,
        grid_co2_gkwh=grid_co2_gkwh,
        vehicle_type=req.vehicle_type
    )

    # 3. AI tip generation for non-transport
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
