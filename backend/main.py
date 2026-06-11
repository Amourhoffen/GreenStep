"""
GreenStep — FastAPI Backend Main Entry Point
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import activities, trees, chat, community, weather, maps, videos

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: build/load RAG indexes"""
    print("[GreenStep] Backend starting up...")
    try:
        from services.rag_service import rag_service
        await rag_service.initialize()
        print("[GreenStep] RAG engine initialized")
    except Exception as e:
        print(f"[GreenStep] RAG engine init warning: {e}")
    yield
    print("[GreenStep] Backend shutting down...")

app = FastAPI(
    title="GreenStep API",
    description="Real-time Carbon Footprint Awareness Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(activities.router, prefix="/api/activities", tags=["Activities"])
app.include_router(trees.router, prefix="/api/trees", tags=["Trees"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(community.router, prefix="/api/community", tags=["Community"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(maps.router, prefix="/api/maps", tags=["Maps"])
app.include_router(videos.router, prefix="/api/videos", tags=["Videos"])

@app.get("/")
async def root():
    return {"message": "🌱 GreenStep API is running", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("BACKEND_PORT", 8000)), reload=True)
