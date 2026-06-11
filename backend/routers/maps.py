"""Maps router — Distance Matrix proxy"""
from fastapi import APIRouter, Query
from services.maps_service import get_distance_km

router = APIRouter()

@router.get("/distance")
async def distance(origin: str = Query(...), destination: str = Query(...)):
    return await get_distance_km(origin, destination)
