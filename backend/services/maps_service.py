"""Google Maps service — Distance Matrix API"""
import os
import httpx
from cachetools import TTLCache

_cache = TTLCache(maxsize=200, ttl=3600)  # 1-hour cache

# Rough straight-line distances between major Indian city pairs (km)
ROUTE_FALLBACKS = {
    ("delhi", "mumbai"): 1415, ("delhi", "bangalore"): 2150, ("delhi", "chennai"): 2200,
    ("delhi", "kolkata"): 1475, ("mumbai", "bangalore"): 980, ("mumbai", "chennai"): 1338,
    ("mumbai", "pune"): 150, ("bangalore", "chennai"): 347, ("patna", "gaya"): 100,
    ("delhi", "agra"): 233, ("delhi", "jaipur"): 281, ("hyderabad", "bangalore"): 575,
    ("ahmedabad", "mumbai"): 525, ("kolkata", "patna"): 580, ("delhi", "lucknow"): 557,
}

def _get_fallback(origin: str, dest: str) -> float:
    o, d = origin.lower().strip().split(",")[0], dest.lower().strip().split(",")[0]
    return (
        ROUTE_FALLBACKS.get((o, d)) or
        ROUTE_FALLBACKS.get((d, o)) or
        50.0  # Generic urban trip fallback
    )


async def get_distance_km(origin: str, destination: str) -> dict:
    cache_key = f"{origin.lower()}|{destination.lower()}"
    if cache_key in _cache:
        return _cache[cache_key]

    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    if api_key:
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.get(
                    "https://maps.googleapis.com/maps/api/distancematrix/json",
                    params={
                        "origins": origin, "destinations": destination,
                        "key": api_key, "units": "metric", "mode": "driving",
                        "region": "in",
                    }
                )
                if resp.status_code == 200:
                    data = resp.json()
                    element = data["rows"][0]["elements"][0]
                    if element["status"] == "OK":
                        dist_m = element["distance"]["value"]
                        result = {
                            "distance_km": dist_m / 1000,
                            "duration_min": element["duration"]["value"] / 60,
                            "distance_text": element["distance"]["text"],
                            "source": "google_maps_live",
                        }
                        _cache[cache_key] = result
                        return result
        except Exception:
            pass

    # Fallback
    km = _get_fallback(origin, destination)
    result = {"distance_km": km, "duration_min": km * 1.2, "source": "static_estimate"}
    _cache[cache_key] = result
    return result
