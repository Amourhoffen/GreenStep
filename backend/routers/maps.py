"""Maps router — Distance Matrix proxy + Trip Emissions Calculator"""
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from services.maps_service import get_distance_km
from services.co2_calculator import TRANSPORT_FACTORS_KG_PER_KM, calculate_deterministic_co2

router = APIRouter()

# ── Vehicle type → internal key mapping ─────────────────────────────────────
VEHICLE_MAP = {
    "car_petrol":   ("Car (Petrol)",   0.192),
    "car_diesel":   ("Car (Diesel)",   0.175),
    "ev":           ("EV",             0.041),
    "bus":          ("Bus",            0.089),
    "metro":        ("Metro/Train",    0.041),
    "bike_petrol":  ("Bike (Petrol)",  0.113),
    "cab_ola":      ("Cab/Taxi",       0.192),
}

class TripRequest(BaseModel):
    origin: str
    destination: str
    vehicle_type: str = "car_petrol"  # default

@router.get("/distance")
async def distance(origin: str = Query(...), destination: str = Query(...)):
    return await get_distance_km(origin, destination)


@router.post("/trip-emissions")
async def trip_emissions(req: TripRequest):
    """
    Calculate CO2 emissions for a journey.
    
    - ALWAYS fetches actual driving distance from Google Maps Distance Matrix API.
    - Falls back to curated ROUTE_FALLBACKS for major Indian city pairs.
    - NEVER returns a hardcoded 50 km for unknown routes — raises HTTP 422 instead.
    - Returns structured JSON matching the AI agent specification.
    """
    if not req.origin.strip() or not req.destination.strip():
        raise HTTPException(status_code=422, detail="Origin and destination are required.")

    # 1. Fetch actual distance ──────────────────────────────────────────────
    dist_data = await get_distance_km(req.origin.strip(), req.destination.strip())
    distance_km: float = dist_data["distance_km"]
    dist_source: str = dist_data.get("source", "unknown")

    # Reject the generic 50 km fallback for completely unknown routes
    # (maps_service returns 50.0 only when city pair is not in ROUTE_FALLBACKS
    #  AND Google Maps is unavailable)
    is_generic_fallback = (distance_km == 50.0 and dist_source == "static_estimate")
    if is_generic_fallback:
        raise HTTPException(
            status_code=422,
            detail=(
                f"Could not determine the actual driving distance between "
                f"'{req.origin}' and '{req.destination}'. "
                "Please check the city names or try with a Google Maps API key configured."
            )
        )

    # 2. Resolve vehicle type ───────────────────────────────────────────────
    vtype = req.vehicle_type.lower().strip()
    if vtype not in VEHICLE_MAP:
        vtype = "car_petrol"
    vehicle_label, emission_factor = VEHICLE_MAP[vtype]

    # 3. Calculate primary CO2 ─────────────────────────────────────────────
    primary_co2 = round(distance_km * emission_factor, 3)

    # 4. Confidence level ──────────────────────────────────────────────────
    if dist_source == "google_maps_live":
        confidence = "HIGH CONFIDENCE"
    elif dist_source == "static_estimate":
        confidence = "ESTIMATED (city-pair lookup)"
    else:
        confidence = "ESTIMATED"

    # 5. Alternatives ──────────────────────────────────────────────────────
    alternatives = []
    alt_types = [
        ("Metro",  "metro",      "🚇"),
        ("Bus",    "bus",        "🚌"),
        ("EV",     "ev",         "⚡"),
    ]
    for alt_label, alt_key, _emoji in alt_types:
        # Skip if the selected vehicle IS the alternative
        if vtype == alt_key:
            continue
        alt_factor = TRANSPORT_FACTORS_KG_PER_KM.get(alt_key, 0.041)
        alt_co2 = round(distance_km * alt_factor, 3)
        reduction_pct = round(((primary_co2 - alt_co2) / primary_co2) * 100, 1) if primary_co2 > 0 else 0.0
        alternatives.append({
            "type": alt_label,
            "co2_kg": alt_co2,
            "reduction_percentage": reduction_pct,
        })

    # 6. AI Reduction Tip ──────────────────────────────────────────────────
    if distance_km > 500:
        tip = (
            f"For a long journey of {distance_km:.0f} km, consider taking a train or flight "
            "instead of driving — trains produce up to 93% less CO₂ per passenger-km than petrol cars."
        )
    elif vtype in ("car_petrol", "car_diesel", "car_suv", "cab_ola"):
        tip = (
            f"Switching to a Metro or EV for this {distance_km:.0f} km trip could save you "
            f"up to {max(a['reduction_percentage'] for a in alternatives if a['reduction_percentage'] > 0):.0f}% "
            "in carbon emissions. Combine trips to further reduce your footprint."
        )
    elif vtype == "ev":
        tip = (
            "Great choice — an EV emits ~79% less CO₂ than a petrol car on India's grid. "
            "Charge during off-peak hours (10 PM–6 AM) to further reduce grid carbon intensity."
        )
    else:
        tip = (
            "Consider carpooling or combining this trip with other errands to maximize efficiency "
            "and further reduce your per-km carbon footprint."
        )

    # 7. Build response ─────────────────────────────────────────────────────
    return {
        "trip_details": {
            "from": req.origin.strip(),
            "to": req.destination.strip(),
            "actual_distance_km": round(distance_km, 2),
            "selected_vehicle": vehicle_label,
            "distance_source": dist_source,
            "duration_min": round(dist_data.get("duration_min", 0), 1),
        },
        "calculation_breakdown": {
            "formula": "Distance × Emission Factor",
            "total_co2_kg": primary_co2,
            "emission_factor_used": emission_factor,
            "confidence_level": confidence,
        },
        "alternatives": alternatives,
        "ai_reduction_tip": tip,
    }
