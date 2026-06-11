"""WattTime API Service — Real-time grid carbon intensity"""
import os
import httpx
import asyncio
from cachetools import TTLCache
from typing import Optional

# Cache with 15-minute TTL
_cache = TTLCache(maxsize=100, ttl=900)

# Indian grid region mapping by state/city
INDIA_REGION_MAP = {
    "delhi": "IN-NO", "new delhi": "IN-NO", "gurgaon": "IN-NO", "noida": "IN-NO",
    "haryana": "IN-NO", "rajasthan": "IN-NO", "punjab": "IN-NO", "himachal": "IN-NO",
    "uttar pradesh": "IN-NO", "lucknow": "IN-NO", "agra": "IN-NO",
    "patna": "IN-EA", "bihar": "IN-EA", "jharkhand": "IN-EA",
    "kolkata": "IN-EA", "west bengal": "IN-EA", "odisha": "IN-EA",
    "mumbai": "IN-WE", "pune": "IN-WE", "maharashtra": "IN-WE",
    "gujarat": "IN-WE", "ahmedabad": "IN-WE", "madhya pradesh": "IN-WE",
    "bangalore": "IN-SO", "bengaluru": "IN-SO", "chennai": "IN-SO",
    "hyderabad": "IN-SO", "kerala": "IN-SO", "karnataka": "IN-SO",
    "tamil nadu": "IN-SO", "andhra": "IN-SO", "telangana": "IN-SO",
    "guwahati": "IN-NE", "assam": "IN-NE", "northeast": "IN-NE",
}

# Fallback emission factors by region (kg CO2/kWh) from India MoEF
FALLBACK_FACTORS = {
    "IN-NO": 0.82,   # Northern grid
    "IN-SO": 0.65,   # Southern grid  
    "IN-WE": 0.78,   # Western grid
    "IN-EA": 0.94,   # Eastern grid
    "IN-NE": 0.45,   # Northeastern grid
    "default": 0.716, # India national average
}

_watttime_token: Optional[str] = None
_token_expiry: float = 0


async def _get_watttime_token() -> Optional[str]:
    """Authenticate with WattTime and get JWT token."""
    global _watttime_token, _token_expiry
    import time
    
    if _watttime_token and time.time() < _token_expiry:
        return _watttime_token
    
    username = os.getenv("WATTTIME_USERNAME")
    password = os.getenv("WATTTIME_PASSWORD")
    
    if not username or not password:
        return None
    
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(
                "https://api.watttime.org/login",
                auth=(username, password)
            )
            if resp.status_code == 200:
                _watttime_token = resp.json().get("token")
                _token_expiry = time.time() + 1700  # ~28 min (token valid 30 min)
                return _watttime_token
    except Exception:
        pass
    return None


def _get_region_for_location(location: str) -> str:
    """Map location string to WattTime region code."""
    loc_lower = location.lower()
    for key, region in INDIA_REGION_MAP.items():
        if key in loc_lower:
            return region
    return "IN-NO"  # Default to Northern


async def get_grid_intensity(location: str) -> dict:
    """
    Get real-time grid carbon intensity for a location.
    Returns kg CO2/kWh and source (watttime or fallback).
    """
    region = _get_region_for_location(location)
    cache_key = f"grid_{region}"
    
    if cache_key in _cache:
        return _cache[cache_key]
    
    # Try WattTime API
    token = await _get_watttime_token()
    if token:
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.get(
                    "https://api.watttime.org/v3/signal-index",
                    headers={"Authorization": f"Bearer {token}"},
                    params={"region": region, "signal_type": "co2_moer"}
                )
                if resp.status_code == 200:
                    data = resp.json()
                    # Convert MOER (lbs CO2/MWh) to kg CO2/kWh
                    moer = data.get("data", [{}])[0].get("value", 0)
                    kg_kwh = moer * 0.000453592  # lbs/MWh → kg/kWh
                    
                    result = {
                        "kg_co2_per_kwh": round(kg_kwh, 4),
                        "region": region,
                        "source": "watttime_live",
                        "signal_type": "co2_moer"
                    }
                    _cache[cache_key] = result
                    return result
        except Exception:
            pass
    
    # Fallback to static factors
    fallback_val = FALLBACK_FACTORS.get(region, FALLBACK_FACTORS["default"])
    result = {
        "kg_co2_per_kwh": fallback_val,
        "region": region,
        "source": "india_moef_static",
        "signal_type": "average_emission_factor"
    }
    _cache[cache_key] = result
    return result
