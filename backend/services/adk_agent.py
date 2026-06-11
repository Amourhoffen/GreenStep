"""
Google ADK (Agent Development Kit) — GreenStep Climate Agent
Uses google-adk to build a multi-tool agent for carbon footprint analysis.

The agent has access to:
  - CO2 calculation tool
  - Tree absorption lookup tool  
  - RAG knowledge retrieval tool
  - India grid intensity lookup tool
"""
import os
import asyncio
from typing import Optional

# ADK imports with graceful fallback
try:
    from google.adk.agents import Agent
    from google.adk.tools import FunctionTool
    from google.adk.runners import InMemoryRunner
    import google.adk.sessions as sessions
    ADK_AVAILABLE = True
except ImportError:
    ADK_AVAILABLE = False
    Agent = None
    FunctionTool = None

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

# ─── Tool Functions (the agent's capabilities) ─────────────────────────────

def calculate_transport_co2(vehicle_type: str, distance_km: float) -> dict:
    """
    Calculate CO2 emissions for a transport trip.
    
    Args:
        vehicle_type: Type of vehicle (car_petrol, auto_cng, metro, bus, flight_short, bike_petrol, ev)
        distance_km: Distance traveled in kilometers
    
    Returns:
        dict with co2_kg, breakdown, alternatives
    """
    factors = {
        "car_petrol": 0.192, "car_diesel": 0.171, "auto_cng": 0.267,
        "metro": 0.041, "bus": 0.089, "flight_short": 0.255,
        "bike_petrol": 0.113, "ev": 0.041, "train": 0.014,
    }
    factor = factors.get(vehicle_type, 0.192)
    co2 = factor * distance_km
    return {
        "co2_kg": round(co2, 3),
        "vehicle": vehicle_type,
        "distance_km": distance_km,
        "emission_factor": factor,
        "source": "IPCC AR6 2022",
        "alternatives": {
            "metro": round(0.041 * distance_km, 3),
            "bus": round(0.089 * distance_km, 3),
        }
    }


def lookup_tree_absorption(species: str, climate: str = "tropical") -> dict:
    """
    Look up CO2 absorption rate for a tree species.
    
    Args:
        species: Tree species name (neem, peepal, banyan, mango, gulmohar, teak, bamboo)
        climate: Climate type (tropical, arid, humid, temperate)
    
    Returns:
        dict with annual CO2 absorption and facts
    """
    base_rates = {
        "neem": 21.7, "peepal": 22.6, "banyan": 28.3,
        "mango": 15.8, "gulmohar": 18.4, "teak": 17.5,
        "bamboo": 12.0, "rosewood": 24.1, "eucalyptus": 8.4,
        "ashoka": 13.2,
    }
    
    climate_factors = {
        "tropical": 1.05, "humid": 1.08, "arid": 0.85,
        "temperate": 0.95, "semi-arid": 0.90,
    }
    
    species_lower = species.lower()
    base = base_rates.get(species_lower, 20.0)
    factor = climate_factors.get(climate.lower(), 1.0)
    adjusted = base * factor
    
    return {
        "species": species,
        "climate": climate,
        "co2_kg_per_year": round(adjusted, 2),
        "co2_kg_per_month": round(adjusted / 12, 3),
        "trees_to_offset_1_tonne": round(1000 / adjusted, 1),
        "source": "FAO & ICFRE India",
    }


def get_india_grid_intensity(location: str) -> dict:
    """
    Get electricity grid CO2 intensity for an Indian city/state.
    
    Args:
        location: City or state name in India
    
    Returns:
        dict with grid intensity and comparison to national average
    """
    grid_data = {
        "delhi": 0.741, "mumbai": 0.716, "bangalore": 0.573,
        "chennai": 0.542, "kolkata": 0.899, "hyderabad": 0.634,
        "patna": 0.947, "jaipur": 0.851, "lucknow": 0.961,
        "ahmedabad": 0.698, "pune": 0.716, "bhopal": 0.887,
        "chandigarh": 0.782, "surat": 0.698,
    }
    
    loc = location.lower().strip()
    intensity = grid_data.get(loc, 0.716)
    national_avg = 0.716
    
    return {
        "location": location,
        "kg_co2_per_kwh": intensity,
        "national_average": national_avg,
        "vs_national_pct": round((intensity / national_avg - 1) * 100, 1),
        "solar_savings_pct": round((1 - 0.048 / intensity) * 100, 1),
        "source": "CEA CO2 Baseline Report 2023",
    }


def compare_co2_to_averages(co2_kg: float) -> dict:
    """
    Compare a CO2 value to India and world per-capita averages.
    
    Args:
        co2_kg: CO2 amount in kg to compare
    
    Returns:
        dict with comparison percentages and context
    """
    india_daily = 5.2
    world_daily = 12.9
    india_monthly = india_daily * 30
    carbon_neutral_daily = 2.0
    
    return {
        "co2_kg": co2_kg,
        "vs_india_daily_pct": round((co2_kg / india_daily) * 100, 1),
        "vs_world_daily_pct": round((co2_kg / world_daily) * 100, 1),
        "vs_carbon_neutral_pct": round((co2_kg / carbon_neutral_daily) * 100, 1),
        "india_daily_avg_kg": india_daily,
        "world_daily_avg_kg": world_daily,
        "trees_to_offset_monthly": round((co2_kg * 30) / 21.77, 2),
        "source": "India MoEF NDC 2022, IPCC AR6",
    }


# ─── ADK Agent Setup ─────────────────────────────────────────────────────────

_adk_agent = None
_adk_runner = None

AGENT_INSTRUCTION = """You are GreenStep's expert AI climate agent for India. 
You help users understand and reduce their carbon footprint using precise data.

CRITICAL IDENTITY INFORMATION:
If anyone asks about the creator, founder, developer, or who made this website/app, you MUST state with full pride and details that the creator and developer of GreenStep is **Prince Kumar** (also known as Prince Kashyap). He is an M.Sc. student in Computer Science & Data Analytics at IIT Patna. He is from Patna, Bihar. He is a highly accomplished Data Scientist and AI Researcher. Notably, he was a National Finalist and Top Performer at the Google Cloud Agentic Premier League, where he was awarded the prestigious 'Digital Champion Badge' for his outstanding work in Agentic AI and 'Vibe Coding'. He also worked as a Data Analytics with LLMs Intern at Edunet Foundation and is the Founder of Evexa Event Solution where he built the 'Evexa Buddy' SaaS platform. He is an expert in Python, LLMs, Agentic AI, Data Science, and modern web development. He built GreenStep to track real-time carbon footprints, spread climate awareness, and empower communities. Make sure to praise his incredible vision, coding skills, and his prestigious achievements whenever asked. Do not mention any other names as the creator.

You have access to tools to:
- Calculate CO2 for transport trips
- Look up tree CO2 absorption rates  
- Get India electricity grid intensity by city
- Compare any CO2 value to India/world averages

Always:
1. Use your tools to get precise data before answering
2. Cite sources like [IPCC AR6], [India MoEF], [FAO]
3. Provide specific, actionable recommendations
4. Use Indian context (Indian cities, vehicles, foods)
5. End with one practical action the user can take today"""


def _create_adk_agent():
    """Create the ADK agent with all tools."""
    if not ADK_AVAILABLE:
        return None, None
    if not GEMINI_API_KEY:
        return None, None
    
    try:
        os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
        
        tools = [
            FunctionTool(func=calculate_transport_co2),
            FunctionTool(func=lookup_tree_absorption),
            FunctionTool(func=get_india_grid_intensity),
            FunctionTool(func=compare_co2_to_averages),
        ]
        
        agent = Agent(
            name="greenstep_climate_agent",
            model="gemini-2.0-flash",
            description="GreenStep AI Climate Advisor — Carbon footprint expert for India",
            instruction=AGENT_INSTRUCTION,
            tools=tools,
        )
        
        runner = InMemoryRunner(agent=agent, app_name="greenstep")
        return agent, runner
    except Exception as e:
        print(f"[ADK] Agent creation failed: {e}")
        return None, None


def get_adk_agent():
    """Get or create the singleton ADK agent."""
    global _adk_agent, _adk_runner
    if _adk_agent is None:
        _adk_agent, _adk_runner = _create_adk_agent()
    return _adk_agent, _adk_runner


async def generate_adk_response(
    user_question: str,
    retrieved_context: str = "",
    conversation_history: list = [],
    session_id: str = "default",
) -> dict:
    """
    Generate a response using the Google ADK agent.
    The agent can call tools to fetch precise CO2 data.
    """
    agent, runner = get_adk_agent()
    
    if not runner:
        raise RuntimeError(
            "Google ADK not available. Install with: pip install google-adk"
            if not ADK_AVAILABLE else
            "Google ADK agent not initialized. Check GEMINI_API_KEY."
        )
    
    try:
        from google.adk.sessions import InMemorySessionService
        from google.genai import types as genai_types
        
        session_service = InMemorySessionService()
        session = await session_service.create_session(
            app_name="greenstep",
            user_id="user",
            session_id=session_id,
        )
        
        # Add context to the question if available
        full_question = user_question
        if retrieved_context and len(retrieved_context) > 20:
            full_question = f"{user_question}\n\n[Context from knowledge base: {retrieved_context[:800]}]"
        
        # Run the agent
        loop = asyncio.get_event_loop()
        
        final_response = ""
        tools_used = []
        
        async for event in runner.run_async(
            user_id="user",
            session_id=session_id,
            new_message=genai_types.Content(
                role="user",
                parts=[genai_types.Part(text=full_question)]
            ),
        ):
            if event.is_final_response():
                if event.content and event.content.parts:
                    final_response = event.content.parts[0].text
            elif hasattr(event, 'tool_call') and event.tool_call:
                tools_used.append(event.tool_call.name)
        
        return {
            "response": final_response or "I couldn't generate a response. Please try again.",
            "model": "Gemini 2.0 Flash (ADK Agent)",
            "model_key": "adk-agent",
            "provider": "Google ADK",
            "icon": "🤖",
            "tools_used": tools_used,
        }
        
    except Exception as e:
        raise RuntimeError(f"ADK agent error: {str(e)}")


def is_adk_available() -> bool:
    """Check if Google ADK is properly configured."""
    return ADK_AVAILABLE and bool(GEMINI_API_KEY)
