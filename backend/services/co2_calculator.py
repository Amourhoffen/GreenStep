"""
Deterministic CO2 Calculator Engine
Real-world emission factors from:
  - IPCC AR6 (2022) — transport
  - India CEA 2023 — grid electricity by state  
  - FAO 2023 — food lifecycle (including supply chain)
  - GHG Protocol — electronics & shopping
"""
from typing import Dict, Any, Optional

# ─────────────────────────────────────────────────────────────────────────────
# TRANSPORT Emission Factors (kg CO2e / km)
# Source: IPCC AR6 (2022), India FAME-II, MORTH data
# ─────────────────────────────────────────────────────────────────────────────
TRANSPORT_FACTORS_KG_PER_KM = {
    "car_petrol":    0.192,   # India avg compact petrol car
    "car_diesel":    0.171,   # India avg compact diesel car
    "car_suv":       0.242,   # India avg SUV petrol
    "bike_petrol":   0.113,   # India avg 2-wheeler 125cc
    "bike_electric": 0.025,   # E-scooter on India grid
    "auto_cng":      0.267,   # Auto-rickshaw CNG 3-wheeler
    "bus":           0.089,   # OSRTC/KSRTC diesel bus per passenger-km
    "metro":         0.041,   # Delhi/Mumbai metro (per passenger-km)
    "train":         0.014,   # Indian Railways (electric loco avg)
    "flight_short":  0.255,   # Domestic flight <1000km, economy seat
    "flight_medium": 0.195,   # Regional international flight economy
    "flight_long":   0.148,   # Intercontinental flight economy
    "ev":            0.041,   # Electric car on India grid (avg 716g/kWh)
    "cab_ola":       0.192,   # Ola/Uber cab (avg petrol car)
    "cycle":         0.000,   # Zero emissions
    "walking":       0.000,   # Zero emissions
}

# ─────────────────────────────────────────────────────────────────────────────
# INDIA STATE GRID EMISSION FACTORS (kg CO2 / kWh)
# Source: CEA CO2 Baseline Report 2023
# ─────────────────────────────────────────────────────────────────────────────
STATE_GRID_FACTORS = {
    # High-coal states
    "jharkhand": 1.049,
    "chhattisgarh": 1.002,
    "odisha": 0.982,
    "uttar pradesh": 0.961,
    "bihar": 0.947,
    "west bengal": 0.899,
    "madhya pradesh": 0.887,
    "rajasthan": 0.851,
    # Mid-range states
    "haryana": 0.824,
    "punjab": 0.782,
    "delhi": 0.741,
    "maharashtra": 0.716,
    "gujarat": 0.698,
    "andhra pradesh": 0.645,
    "telangana": 0.634,
    "karnataka": 0.573,
    "tamil nadu": 0.542,
    # Renewables-heavy states
    "himachal pradesh": 0.234,
    "uttarakhand": 0.289,
    "sikkim": 0.112,
    "india": 0.716,  # national average fallback
}

# City → State mapping
CITY_STATE_MAP = {
    "delhi": "delhi", "new delhi": "delhi",
    "mumbai": "maharashtra", "pune": "maharashtra", "nagpur": "maharashtra",
    "bangalore": "karnataka", "bengaluru": "karnataka",
    "chennai": "tamil nadu", "coimbatore": "tamil nadu", "madurai": "tamil nadu",
    "hyderabad": "telangana",
    "kolkata": "west bengal",
    "ahmedabad": "gujarat", "surat": "gujarat",
    "patna": "bihar",
    "jaipur": "rajasthan",
    "lucknow": "uttar pradesh", "agra": "uttar pradesh", "kanpur": "uttar pradesh",
    "bhopal": "madhya pradesh", "indore": "madhya pradesh",
    "chandigarh": "punjab",
    "bhubaneswar": "odisha",
    "raipur": "chhattisgarh",
    "ranchi": "jharkhand",
}

def get_grid_factor(location: str) -> float:
    """Get state-level grid emission factor for a location."""
    loc_lower = location.lower().strip()
    # Direct city match
    state = CITY_STATE_MAP.get(loc_lower)
    if state:
        return STATE_GRID_FACTORS.get(state, 0.716)
    # Partial match
    for city, state in CITY_STATE_MAP.items():
        if city in loc_lower or loc_lower in city:
            return STATE_GRID_FACTORS.get(state, 0.716)
    # State direct match
    for state, factor in STATE_GRID_FACTORS.items():
        if state in loc_lower:
            return factor
    return 0.716  # India national average


# ─────────────────────────────────────────────────────────────────────────────
# FOOD Emission Factors (kg CO2e / kg food consumed)
# Source: FAO 2023, Poore & Nemecek (Science 2018) — full lifecycle
# ─────────────────────────────────────────────────────────────────────────────
FOOD_FACTORS_KG_PER_KG = {
    "beef":         60.0,   # Ruminant methane + land use
    "lamb":         24.0,
    "mutton":       22.1,
    "pork":         7.6,
    "chicken":      6.9,
    "fish_farmed":  5.4,
    "fish_wild":    3.0,
    "eggs":         4.5,
    "dairy":        3.2,    # Milk/paneer/curd
    "cheese":       13.5,
    "rice":         2.7,    # Paddy methane included
    "wheat":        1.4,
    "vegetables":   2.0,    # Mixed Indian vegetables avg
    "lentils":      0.9,    # Dal — high protein, low carbon
    "pulses":       0.9,
    "fruits":       0.7,
    "nuts":         2.3,
    "chocolate":    19.0,
    "coffee":       17.0,
    "tea":          2.9,
    "alcohol_beer": 0.5,    # per 330ml
    "sweets":       3.5,
}

# ─────────────────────────────────────────────────────────────────────────────
# SHOPPING Emission Factors (kg CO2e / item, whole lifecycle)
# Source: GHG Protocol Product Lifecycle Standard, EPA EPD data
# ─────────────────────────────────────────────────────────────────────────────
SHOPPING_FACTORS = {
    "smartphone":       70.0,   # Mfg 57kg + charging 2yr + disposal
    "smartphone_new":   70.0,
    "laptop":           302.0,  # Full LCA incl. materials
    "laptop_new":       302.0,
    "tablet":           100.0,
    "tv_32":            250.0,
    "tv_43":            380.0,
    "tv_55":            460.0,
    "ac_1t":            450.0,  # Mfg + refrigerant + shipping
    "ac_1_5t":          530.0,
    "refrigerator":     400.0,
    "washing_machine":  200.0,
    "clothing_fast":    19.5,   # H&M / Zara synthetic fiber
    "clothing_organic": 5.8,    # Organic cotton, local
    "jeans":            33.4,   # Single pair denim
    "online_delivery":  0.9,    # Per package (last-mile logistics)
    "books":            2.4,    # Paper + printing + logistics
    "furniture":        80.0,   # Avg chair/table
    "mattress":         90.0,
    "car_new":          8000.0, # Manufacture + shipping to India
    "motorcycle_new":   800.0,
}


def calculate_deterministic_co2(
    category: str,
    activity_type: str,
    details: Dict[str, Any],
    distance_km: Optional[float] = None,
    grid_co2_gkwh: Optional[float] = None,
    vehicle_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Multi-source deterministic CO2 calculation.
    Returns rich result with breakdown, projections, alternatives.
    """
    co2_kg = 0.0
    breakdown = ""
    annual_projection = 0.0
    alternatives = []
    confidence = "high"

    # ── TRANSPORT ────────────────────────────────────────────────────────────
    if category == "transport":
        vtype = vehicle_type or "car_petrol"
        factor = TRANSPORT_FACTORS_KG_PER_KM.get(vtype, 0.192)
        dist = distance_km if distance_km and distance_km > 0 else float(details.get("distance_km", 20.0))
        co2_kg = factor * dist
        
        # Fuel cost context
        fuel_l = (dist / 15.0) if "petrol" in vtype else (dist / 20.0) if "diesel" in vtype else 0
        
        breakdown = (
            f"Distance: {dist:.1f} km × Emission Factor: {factor} kg CO₂/km\n"
            f"= {co2_kg:.3f} kg CO₂e\n"
            f"Source: IPCC AR6 (2022), India MORTH data"
        )
        # Annual projection (assuming same trip 5x/week)
        annual_projection = co2_kg * 5 * 52
        
        # Alternatives
        if vtype in ("car_petrol", "car_diesel", "car_suv", "cab_ola"):
            metro_co2 = TRANSPORT_FACTORS_KG_PER_KM["metro"] * dist
            bus_co2 = TRANSPORT_FACTORS_KG_PER_KM["bus"] * dist
            alternatives = [
                {"mode": "🚇 Metro", "co2": round(metro_co2, 3), "saving_pct": round((1 - metro_co2/co2_kg)*100)},
                {"mode": "🚌 Bus", "co2": round(bus_co2, 3), "saving_pct": round((1 - bus_co2/co2_kg)*100)},
                {"mode": "⚡ EV", "co2": round(TRANSPORT_FACTORS_KG_PER_KM["ev"] * dist, 3), "saving_pct": round((1 - (TRANSPORT_FACTORS_KG_PER_KM["ev"] * dist)/co2_kg)*100)},
            ]
        confidence = "high" if distance_km else "medium"

    # ── FOOD ─────────────────────────────────────────────────────────────────
    elif category == "food":
        food_key = details.get("food_key", "chicken")
        factor = FOOD_FACTORS_KG_PER_KG.get(food_key, details.get("factor_kg_per_kg", 6.9))
        quantity = float(details.get("quantity_kg", 0.3))
        co2_kg = factor * quantity
        
        breakdown = (
            f"Quantity: {quantity} kg × Lifecycle Factor: {factor} kg CO₂e/kg\n"
            f"= {co2_kg:.3f} kg CO₂e\n"
            f"Source: FAO 2023, Poore & Nemecek (Science 2018)"
        )
        # Annual projection (if eaten 3x/week)
        annual_projection = co2_kg * 3 * 52
        
        # Lower-carbon alternatives
        plant_items = [(k, v) for k, v in FOOD_FACTORS_KG_PER_KG.items() if v < factor * 0.5 and v > 0]
        plant_items.sort(key=lambda x: x[1])
        alternatives = [
            {"mode": f"🌱 {k.replace('_', ' ').title()}", "co2": round(v * quantity, 3), 
             "saving_pct": round((1 - (v * quantity)/co2_kg)*100)}
            for k, v in plant_items[:3] if co2_kg > 0
        ]

    # ── ENERGY ───────────────────────────────────────────────────────────────
    elif category == "energy":
        watts = float(details.get("watts", 1500))
        hours = float(details.get("hours", 1.0))
        kwh = (watts * hours) / 1000.0
        location = details.get("location", "india")
        
        # Use live WattTime data if available, else use state-level CEA data
        if grid_co2_gkwh and grid_co2_gkwh > 0:
            intensity = grid_co2_gkwh / 1000.0
            source = "WattTime API (live)"
        else:
            intensity = get_grid_factor(location)
            source = f"CEA 2023 — {location}"
        
        co2_kg = kwh * intensity
        
        breakdown = (
            f"Power: {watts}W × {hours}h = {kwh:.3f} kWh\n"
            f"Grid Intensity ({location}): {intensity:.4f} kg CO₂/kWh\n"
            f"= {co2_kg:.3f} kg CO₂e\n"
            f"Source: {source}"
        )
        # Annual projection (same usage every day)
        annual_projection = co2_kg * 365
        
        alternatives = [
            {"mode": "☀️ Solar Power", "co2": round(kwh * 0.041, 3), "saving_pct": round((1 - 0.041/intensity)*100) if intensity > 0 else 0},
            {"mode": "🌙 Off-peak hours", "co2": round(co2_kg * 0.85, 3), "saving_pct": 15},
        ]
        confidence = "high" if grid_co2_gkwh else "medium"

    # ── SHOPPING ─────────────────────────────────────────────────────────────
    elif category == "shopping":
        item_key = details.get("item_key", "clothing_fast")
        item_co2 = SHOPPING_FACTORS.get(item_key, details.get("co2_per_unit", 20.0))
        quantity = int(details.get("quantity", 1))
        co2_kg = item_co2 * quantity
        
        breakdown = (
            f"Item carbon cost: {item_co2} kg CO₂e × qty {quantity}\n"
            f"= {co2_kg:.3f} kg CO₂e (full lifecycle incl. manufacturing)\n"
            f"Source: GHG Protocol Product Lifecycle Standard"
        )
        annual_projection = co2_kg  # One-time purchase
        alternatives = [
            {"mode": "🔄 Buy second-hand", "co2": round(co2_kg * 0.15, 2), "saving_pct": 85},
            {"mode": "♻️ Rent / borrow", "co2": round(co2_kg * 0.05, 2), "saving_pct": 95},
        ]

    else:
        co2_kg = 2.0
        breakdown = "Generic fallback — activity not specifically categorized"
        annual_projection = co2_kg * 52
        confidence = "low"

    # Trees needed to offset (Indian tree avg: 21.77 kg CO2/year → 1.814 kg/month)
    trees_monthly = co2_kg / 1.814
    
    # India avg comparison: Indian produces ~1.9 tonnes CO2/year = 5.2 kg/day
    india_avg_daily = 5.2
    vs_india_pct = round((co2_kg / india_avg_daily) * 100, 1)
    
    # World avg: 4.7 tonnes/year = 12.9 kg/day  
    world_avg_daily = 12.9
    vs_world_pct = round((co2_kg / world_avg_daily) * 100, 1)

    return {
        "co2_kg": round(co2_kg, 3),
        "calculation_method": f"Deterministic multi-source calculation ({category.title()})",
        "equivalent_trees_monthly": round(trees_monthly, 2),
        "annual_projection_kg": round(annual_projection, 1),
        "confidence": confidence,
        "breakdown": breakdown,
        "alternatives": alternatives,
        "vs_india_pct": vs_india_pct,
        "vs_world_pct": vs_world_pct,
        "reduction_tip": "Consider lower-carbon alternatives for this activity.",  # AI overwrites
        "data_sources": ["IPCC AR6 2022", "India CEA 2023", "FAO 2023", "GHG Protocol"],
    }
