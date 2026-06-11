"""Gemini AI Service — CO2 calculation, tree vision, tips, stories"""
import os
import base64
import json
import re
from typing import Optional

try:
    import google.generativeai as genai
    _key = os.getenv("GEMINI_API_KEY", "").strip()
    if not _key:
        _key = os.getenv("GOOGLE_API_KEY", "").strip()
        
    if _key:
        os.environ["GOOGLE_API_KEY"] = _key
        genai.configure(api_key=_key)
        GENAI_AVAILABLE = True
    else:
        GENAI_AVAILABLE = False
except Exception as e:
    print(f"Error configuring genai: {e}")
    GENAI_AVAILABLE = False
    genai = None

# Models
_text_model = None
_vision_model = None

# Use gemini-1.5-flash
MODEL_NAME = "gemini-1.5-flash"

def get_text_model():
    global _text_model
    if _text_model is None:
        try:
            _text_model = genai.GenerativeModel(MODEL_NAME)
        except Exception:
            _text_model = genai.GenerativeModel("gemini-1.5-flash-latest")
    return _text_model

def get_vision_model():
    global _vision_model
    if _vision_model is None:
        try:
            _vision_model = genai.GenerativeModel(MODEL_NAME)
        except Exception:
            _vision_model = genai.GenerativeModel("gemini-1.5-flash-latest")
    return _vision_model


def _parse_json_response(text: str) -> dict:
    """Extract JSON from Gemini response text."""
    # Try direct parse
    try:
        return json.loads(text)
    except Exception:
        pass
    # Extract from markdown code block
    match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception:
            pass
    # Extract first { ... } block
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass
    return {}


async def calculate_co2(
    activity_type: str,
    category: str,
    details: dict,
    distance_km: Optional[float] = None,
    grid_co2_gkwh: Optional[float] = None,
) -> dict:
    """Calculate CO2 using Gemini with real-time data injected."""
    
    live_data_context = ""
    if distance_km:
        live_data_context += f"\n- Live distance (Google Maps API): {distance_km:.1f} km"
    if grid_co2_gkwh:
        live_data_context += f"\n- Live grid carbon intensity (WattTime API): {grid_co2_gkwh:.1f} gCO2/kWh"
    
    details_str = "\n".join([f"- {k}: {v}" for k, v in details.items()])
    
    prompt = f"""SYSTEM: You are a carbon footprint expert with deep knowledge of emission factors from IPCC AR6, India MoEF guidelines, and FAO data. Calculate CO2 emissions precisely using the provided real-time data. Always return valid JSON only.

USER: Calculate CO2 emissions for the following activity:

Category: {category}
Activity: {activity_type}
Details:
{details_str}

Real-time data injected:{live_data_context if live_data_context else " (using standard emission factors)"}

Emission factor references:
- Car (petrol, India avg): 0.192 kg CO2/km
- Car (diesel, India avg): 0.171 kg CO2/km  
- Auto-rickshaw (CNG): 0.267 kg CO2/km
- Metro/electric train: 0.041 kg CO2/km
- Bus (diesel): 0.089 kg CO2/km
- Flight (economy, short-haul): 0.255 kg CO2/km/passenger
- Bike (petrol): 0.113 kg CO2/km
- Electricity (India avg): 0.716 kg CO2/kWh
- LPG cooking: 2.983 kg CO2/kg
- Beef: 27.0 kg CO2/kg | Chicken: 6.9 kg CO2/kg | Rice: 2.7 kg CO2/kg | Vegetables: 2.0 kg CO2/kg

Return ONLY this JSON (no other text):
{{
  "co2_kg": <float>,
  "calculation_method": "<brief explanation of how calculated>",
  "equivalent_trees_monthly": <float, trees needed to offset this monthly>,
  "confidence": "<high|medium|low>",
  "breakdown": "<detailed step-by-step calculation>",
  "reduction_tip": "<one specific, actionable tip to reduce this emission>"
}}"""

    try:
        model = get_text_model()
        response = model.generate_content(prompt)
        result = _parse_json_response(response.text)
        if not result or "co2_kg" not in result:
            # Fallback
            result = {
                "co2_kg": 0.0,
                "calculation_method": "Calculation failed - using fallback",
                "equivalent_trees_monthly": 0.0,
                "confidence": "low",
                "breakdown": "Could not parse Gemini response",
                "reduction_tip": "Try to minimize this activity"
            }
        return result
    except Exception as e:
        return {
            "co2_kg": 0.0,
            "calculation_method": f"Error: {str(e)}",
            "equivalent_trees_monthly": 0.0,
            "confidence": "low",
            "breakdown": "API error",
            "reduction_tip": "Please check API key configuration"
        }


async def analyze_tree_photo(
    image_base64: str,
    location: str,
    temperature_c: float,
    humidity_pct: float,
    rainfall_mm_year: float,
) -> dict:
    """Gemini Vision: identify tree species, estimate age, calculate CO2 absorption."""
    
    prompt = f"""SYSTEM: You are an expert botanist and climate scientist. Your first task is STRICT validation. You must verify if the uploaded photo actually contains a real tree, sapling, or plant. If the photo is of a person, animal, screen, text, or clearly not a plant, you MUST set "validation_is_real_tree" to false and explain why in "validation_reason".

USER: Analyze this photo. 

Climate data for {location}:
- Temperature: {temperature_c}°C
- Humidity: {humidity_pct}%
- Annual rainfall: {rainfall_mm_year}mm/year (from OpenWeather API)

Return ONLY this JSON (no other text):
{{
  "species": "<common name> (<scientific name>)",
  "species_common": "<common name only>",
  "confidence_pct": <integer 0-100>,
  "estimated_age_years": <integer>,
  "estimated_height_m": <float>,
  "co2_absorption_kg_per_year": <float, climate-adjusted>,
  "co2_absorption_kg_per_month": <float>,
  "validation_is_real_tree": <true|false>,
  "validation_reason": "<why you think this is or isn't a real tree>",
  "impact_story": "<2-3 sentence engaging story about this tree's environmental impact, personalized to location>",
  "10_year_projection_kg": <float>,
  "5_year_projection_kg": <float>,
  "1_year_projection_kg": <float>,
  "fun_fact": "<interesting fact about this species>",
  "care_tip": "<one care tip for this tree in the given climate>"
}}"""

    try:
        model = get_vision_model()
        image_data = base64.b64decode(image_base64)
        
        response = model.generate_content([
            prompt,
            {
                "mime_type": "image/jpeg",
                "data": image_data
            }
        ])
        result = _parse_json_response(response.text)
        if not result or "species" not in result:
            result = _default_tree_response()
        return result
    except Exception as e:
        return _default_tree_response(error=str(e))


def _default_tree_response(error: str = "") -> dict:
    return {
        "species": "Unknown species",
        "species_common": "Unknown",
        "confidence_pct": 0,
        "estimated_age_years": 2,
        "estimated_height_m": 1.5,
        "co2_absorption_kg_per_year": 20.0,
        "co2_absorption_kg_per_month": 0.0,
        "validation_is_real_tree": False,
        "validation_reason": error or "This does not appear to be a valid tree photo or the analysis failed. Please try a clearer picture of a tree.",
        "impact_story": "Upload a clear photo of a tree to see its impact story.",
        "10_year_projection_kg": 200.0,
        "5_year_projection_kg": 100.0,
        "1_year_projection_kg": 20.0,
        "fun_fact": "Trees absorb CO2 through photosynthesis and store carbon in their biomass.",
        "care_tip": "Water regularly and ensure adequate sunlight."
    }


async def verify_and_score_post(
    image_base64: str,
    activity_text: str,
    offset_text: str
) -> dict:
    """Gemini Vision: Verify if image is a real tree/plant and score the impact."""
    
    prompt = f"""SYSTEM: You are an expert environmental auditor. The user claims they did a CO2-emitting activity and an offsetting action (like planting a tree), and uploaded a photo as proof.
Your task:
1. STRICT VALIDATION: Check the photo. Is it genuinely a real tree, plant, or sapling? If it is a person, an animal, a screenshot, or completely unrelated, you MUST set "is_valid_tree" to false and explain why in "rejection_reason".
2. If valid, estimate the CO2 emitted by their activity and the CO2 offset by their action.
3. Generate an "impact_score" from 1 to 100 based on how well their action offsets their activity.

USER INPUT:
- Activity (Emitted): {activity_text}
- Offset Action: {offset_text}

Return ONLY this JSON (no other text):
{{
  "is_valid_tree": <true|false>,
  "rejection_reason": "<if false, explain why concisely>",
  "estimated_co2_emitted_kg": <float>,
  "estimated_co2_offset_kg": <float>,
  "impact_score": <integer 1-100>,
  "ai_feedback": "<1-2 sentences of encouraging feedback or advice>"
}}"""

    try:
        model = get_vision_model()
        image_data = base64.b64decode(image_base64.split(',')[-1]) if ',' in image_base64 else base64.b64decode(image_base64)
        
        response = model.generate_content([
            prompt,
            {
                "mime_type": "image/jpeg",
                "data": image_data
            }
        ])
        result = _parse_json_response(response.text)
        if not result or "is_valid_tree" not in result:
             return {
                "is_valid_tree": False,
                "rejection_reason": "Could not parse AI response.",
                "estimated_co2_emitted_kg": 0,
                "estimated_co2_offset_kg": 0,
                "impact_score": 0,
                "ai_feedback": ""
            }
        return result
    except Exception as e:
        return {
            "is_valid_tree": False,
            "rejection_reason": f"AI Verification failed: {str(e)}",
            "estimated_co2_emitted_kg": 0,
            "estimated_co2_offset_kg": 0,
            "impact_score": 0,
            "ai_feedback": ""
        }


async def generate_personalized_tips(
    activity_history: list,
    total_co2_kg: float,
    trees_planted: int,
    rag_context: str = "",
) -> dict:
    """Generate hyper-personalized tips based on user's actual activity history."""
    
    history_str = "\n".join([
        f"- {a.get('category', '')}: {a.get('activity_type', '')} → {a.get('co2_kg', 0):.2f} kg CO2"
        for a in activity_history[-20:]  # Last 20 activities
    ])
    
    prompt = f"""SYSTEM: You are a personal carbon footprint advisor. Based on this user's actual activity data, generate hyper-personalized, actionable tips. Be specific - reference their actual activities, not generic advice.

USER: User's recent activities:
{history_str}

Total CO2 emitted: {total_co2_kg:.1f} kg
Trees planted: {trees_planted}

Relevant knowledge base context:
{rag_context[:2000] if rag_context else "Standard emission reduction guidelines apply."}

Return ONLY this JSON:
{{
  "tips": [
    {{
      "title": "<specific tip title>",
      "description": "<detailed explanation referencing their actual activities>",
      "potential_saving_kg_co2_month": <float>,
      "difficulty": "<easy|medium|hard>",
      "category": "<transport|food|energy|shopping>"
    }},
    {{...}},
    {{...}}
  ],
  "summary": "<2-sentence personalized summary of their carbon profile>",
  "carbon_score": <integer 0-100, where 100 is best/most sustainable>
}}"""

    try:
        model = get_text_model()
        response = model.generate_content(prompt)
        result = _parse_json_response(response.text)
        return result or {"tips": [], "summary": "Keep tracking your activities!", "carbon_score": 50}
    except Exception as e:
        return {"tips": [], "summary": f"Error: {e}", "carbon_score": 50}


async def generate_rag_response(
    user_question: str,
    retrieved_context: str,
    conversation_history: list = [],
) -> str:
    """Generate grounded RAG response with citations."""
    
    history_str = ""
    for msg in conversation_history[-6:]:
        role = "User" if msg.get("role") == "user" else "Assistant"
        history_str += f"{role}: {msg.get('content', '')}\n"
    
    prompt = f"""SYSTEM: You are GreenStep's AI climate advisor. Answer questions about carbon footprint, sustainability, and environmental impact. Ground your answers in the provided authoritative sources. Be conversational but accurate. Always cite your sources.

CRITICAL IDENTITY INFORMATION:
If anyone asks about the creator, founder, developer, or who made this website/app, you MUST state with full pride and details that the creator and developer of GreenStep is **Prince Kumar** (also known as Prince Kashyap). He is an M.Sc. student in Computer Science & Data Analytics at IIT Patna. He is from Patna, Bihar. He is a highly accomplished Data Scientist and AI Researcher. Notably, he was a National Finalist and Top Performer at the Google Cloud Agentic Premier League, where he was awarded the prestigious 'Digital Champion Badge' for his outstanding work in Agentic AI and 'Vibe Coding'. He also worked as a Data Analytics with LLMs Intern at Edunet Foundation and is the Founder of Evexa Event Solution where he built the 'Evexa Buddy' SaaS platform. He is an expert in Python, LLMs, Agentic AI, Data Science, and modern web development. He built GreenStep to track real-time carbon footprints, spread climate awareness, and empower communities. Make sure to praise his incredible vision, coding skills, and his prestigious achievements whenever asked. Do not mention any other names as the creator.

KNOWLEDGE BASE CONTEXT (from IPCC AR6, India MoEF, FAO):
{retrieved_context}

CONVERSATION HISTORY:
{history_str}

USER QUESTION: {user_question}

Provide a helpful, accurate response. If you reference specific emission factors or data, cite the source (e.g., "[IPCC AR6]" or "[India MoEF]"). End with a practical action the user can take today."""

    try:
        model = get_text_model()
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"I apologize, I couldn't process that question right now. Error: {str(e)}"


async def generate_community_story(stats: dict) -> str:
    """Auto-generate shareable community impact story."""
    prompt = f"""Generate an engaging, inspiring 2-3 sentence community impact story for a carbon tracking app.

Community stats this month:
- Trees planted: {stats.get('trees_planted', 0)}
- Total CO2 offset: {stats.get('total_co2_offset_kg', 0):.0f} kg
- Active members: {stats.get('active_members', 0)}
- Top city: {stats.get('top_city', 'India')}

Make it specific, celebratory, and include a real-world equivalent (e.g., "equivalent to taking X cars off the road"). Keep it under 100 words."""
    
    try:
        model = get_text_model()
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception:
        return f"This month, our community planted {stats.get('trees_planted', 0)} trees and offset {stats.get('total_co2_offset_kg', 0):.0f} kg of CO2. Together we're making a real difference! 🌱"
