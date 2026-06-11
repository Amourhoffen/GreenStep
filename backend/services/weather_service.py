"""Weather service — OpenWeather API proxy with caching"""
import os
import httpx
from cachetools import TTLCache

_cache = TTLCache(maxsize=100, ttl=900)  # 15-min cache

# Fallback climate data for major Indian cities
CITY_DEFAULTS = {
    "delhi": {"temperature_c": 28, "humidity_pct": 55, "rainfall_mm_year": 790},
    "mumbai": {"temperature_c": 28, "humidity_pct": 80, "rainfall_mm_year": 2422},
    "bangalore": {"temperature_c": 24, "humidity_pct": 70, "rainfall_mm_year": 970},
    "chennai": {"temperature_c": 30, "humidity_pct": 72, "rainfall_mm_year": 1400},
    "kolkata": {"temperature_c": 28, "humidity_pct": 76, "rainfall_mm_year": 1582},
    "patna": {"temperature_c": 27, "humidity_pct": 67, "rainfall_mm_year": 1020},
    "hyderabad": {"temperature_c": 27, "humidity_pct": 60, "rainfall_mm_year": 812},
    "ahmedabad": {"temperature_c": 29, "humidity_pct": 52, "rainfall_mm_year": 782},
    "pune": {"temperature_c": 25, "humidity_pct": 65, "rainfall_mm_year": 722},
    "jaipur": {"temperature_c": 27, "humidity_pct": 40, "rainfall_mm_year": 650},
    "lucknow": {"temperature_c": 27, "humidity_pct": 60, "rainfall_mm_year": 880},
    "goa": {"temperature_c": 29, "humidity_pct": 85, "rainfall_mm_year": 3000},
}


async def get_weather_data(city: str) -> dict:
    """Fetch weather data from OpenWeather API."""
    city_lower = city.lower().strip()
    if city_lower in _cache:
        return _cache[city_lower]

    api_key = os.getenv("OPENWEATHER_API_KEY")
    if api_key:
        try:
            async with httpx.AsyncClient(timeout=8) as client:
                resp = await client.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    params={"q": city, "appid": api_key, "units": "metric"}
                )
                if resp.status_code == 200:
                    data = resp.json()
                    result = {
                        "temperature_c": data["main"]["temp"],
                        "humidity_pct": data["main"]["humidity"],
                        "rainfall_mm_year": 1000,  # OWM doesn't give annual; use default
                        "description": data["weather"][0]["description"],
                        "city": data["name"],
                        "source": "openweather_live",
                    }
                    _cache[city_lower] = result
                    return result
        except Exception:
            pass

    # Fallback
    defaults = CITY_DEFAULTS.get(city_lower, {"temperature_c": 28, "humidity_pct": 65, "rainfall_mm_year": 1000})
    result = {**defaults, "city": city, "source": "static_fallback"}
    _cache[city_lower] = result
    return result
