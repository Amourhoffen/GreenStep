"""Weather and Maps routers — proxy endpoints"""
from fastapi import APIRouter
from services.weather_service import get_weather_data
from services.maps_service import get_distance_km

router = APIRouter()

@router.get("/{city}")
async def weather(city: str):
    return await get_weather_data(city)
