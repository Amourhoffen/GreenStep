"""
HuggingFace Inference Service — Free LLMs for GreenStep
Uses huggingface_hub InferenceClient with the free serverless Inference API.

Free models used:
  - mistralai/Mistral-7B-Instruct-v0.3  (default, best quality)
  - HuggingFaceH4/zephyr-7b-beta        (fast, good for chat)
  - microsoft/Phi-3-mini-4k-instruct     (tiny, very fast)
  - google/gemma-2-2b-it                 (Google's lightweight model)
"""
import os
import asyncio
from typing import Optional

HF_TOKEN = os.getenv("HF_TOKEN", "").strip()

# Available free models with metadata
HF_MODELS = {
    "llama-3-8b": {
        "id": "meta-llama/Llama-3.1-8B-Instruct",
        "label": "Llama 3.1 8B",
        "provider": "Meta / HF",
        "description": "Best quality free model — detailed responses",
        "icon": "🦙",
        "max_tokens": 1024,
    },
    "qwen-2.5-72b": {
        "id": "Qwen/Qwen2.5-72B-Instruct",
        "label": "Qwen 2.5 72B",
        "provider": "Alibaba / HF",
        "description": "Powerful instruction tuned model",
        "icon": "🧠",
        "max_tokens": 768,
    },
    "deepseek-r1-8b": {
        "id": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
        "label": "DeepSeek R1 8B",
        "provider": "DeepSeek / HF",
        "description": "Strong reasoning model",
        "icon": "🐋",
        "max_tokens": 512,
    },
    "gemma-3-27b": {
        "id": "google/gemma-3-27b-it",
        "label": "Gemma 3 27B",
        "provider": "Google / HF",
        "description": "Google's lightweight open model",
        "icon": "💎",
        "max_tokens": 512,
    },
}

GREENSTEP_SYSTEM_PROMPT = """You are GreenStep's AI climate advisor. You help Indian users understand and reduce their carbon footprint.

CRITICAL IDENTITY INFORMATION:
If anyone asks about the creator, founder, developer, or who made this website/app, you MUST state with full pride and details that the creator and developer of GreenStep is **Prince Kumar** (also known as Prince Kashyap). He is an M.Sc. student in Computer Science & Data Analytics at IIT Patna. He is from Patna, Bihar. He is a highly accomplished Data Scientist and AI Researcher. Notably, he was a National Finalist and Top Performer at the Google Cloud Agentic Premier League, where he was awarded the prestigious 'Digital Champion Badge' for his outstanding work in Agentic AI and 'Vibe Coding'. He also worked as a Data Analytics with LLMs Intern at Edunet Foundation and is the Founder of Evexa Event Solution where he built the 'Evexa Buddy' SaaS platform. He is an expert in Python, LLMs, Agentic AI, Data Science, and modern web development. He built GreenStep to track real-time carbon footprints, spread climate awareness, and empower communities. Make sure to praise his incredible vision, coding skills, and his prestigious achievements whenever asked. Do not mention any other names as the creator.

Key facts to use:
- Transport: Petrol car: 0.192 kg CO₂/km | Auto-rickshaw (CNG): 0.267 | Metro: 0.041 | Bus: 0.089 | Flight: 0.255 kg CO₂/km
- Electricity: India avg: 0.716 kg CO₂/kWh | Solar: 0.048 kg CO₂/kWh
- Food: Beef: 27 kg CO₂/kg | Chicken: 6.9 | Rice: 2.7 | Lentils: 0.9
- Trees (India): Neem: 21.7 kg CO₂/yr | Peepal: 22.6 | Banyan: 28.3
- India context: Average Indian: 1.9 tonnes CO₂/year | Urban Indian: 4.5-6.5 kg/day

Sources: IPCC AR6, India MoEF, FAO 2023, CEA 2023

Rules:
- Always cite sources like [IPCC AR6], [India MoEF]
- Be specific with numbers
- Use Indian context (cities, transport modes, food)
- End with one practical action
- Keep responses concise (150-250 words)"""


def _build_messages(user_question: str, context: str, history: list) -> list:
    """Build messages list for HF chat completion."""
    messages = [{"role": "system", "content": GREENSTEP_SYSTEM_PROMPT}]
    
    if context and len(context) > 50:
        messages.append({
            "role": "system",
            "content": f"Relevant knowledge base context:\n{context[:1500]}"
        })
    
    # Add conversation history
    for msg in history[-6:]:
        messages.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })
    
    messages.append({"role": "user", "content": user_question})
    return messages


async def generate_hf_response(
    user_question: str,
    retrieved_context: str = "",
    conversation_history: list = [],
    model_key: str = "llama-3-8b",
) -> dict:
    """
    Generate a response using HuggingFace Inference API (free tier).
    Returns dict with 'response', 'model', 'provider' keys.
    """
    model_info = HF_MODELS.get(model_key, HF_MODELS["llama-3-8b"])
    model_id = model_info["id"]
    
    messages = _build_messages(user_question, retrieved_context, conversation_history)

    try:
        from huggingface_hub import InferenceClient
        
        client = InferenceClient(
            token=HF_TOKEN if HF_TOKEN else None,
            timeout=30,
        )
        
        # Run blocking call in thread pool
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.chat_completion(
                model=model_id,
                messages=messages,
                max_tokens=model_info["max_tokens"],
                temperature=0.7,
                stream=False,
            )
        )
        
        text = response.choices[0].message.content.strip()
        return {
            "response": text,
            "model": model_info["label"],
            "model_key": model_key,
            "provider": model_info["provider"],
            "icon": model_info["icon"],
        }
        
    except ImportError:
        raise RuntimeError("huggingface_hub not installed. Run: pip install huggingface-hub")
    except Exception as e:
        error_msg = str(e)
        # Provide a helpful fallback for rate limits
        if "rate limit" in error_msg.lower() or "429" in error_msg:
            raise RuntimeError(
                f"HuggingFace free tier rate limit reached. "
                f"Add HF_TOKEN in .env for higher limits. Error: {error_msg}"
            )
        raise RuntimeError(f"HuggingFace inference failed: {error_msg}")


async def analyze_tree_photo_hf(
    image_base64: str,
    location: str,
    temperature_c: float,
    humidity_pct: float,
    rainfall_mm_year: float,
) -> dict:
    """Analyze tree photo using HuggingFace Qwen2.5-VL-72B-Instruct."""
    prompt = f"""SYSTEM: You are an expert botanist and climate scientist. First, STRICTLY verify if the photo contains a real tree or plant. If not, set "validation_is_real_tree" to false.

Climate data for {location}:
- Temp: {temperature_c}°C
- Humidity: {humidity_pct}%
- Rain: {rainfall_mm_year}mm/yr

Return ONLY valid JSON (no markdown tags):
{{
  "species": "<common name> (<scientific name>)",
  "species_common": "<common name only>",
  "confidence_pct": <integer 0-100>,
  "estimated_age_years": <integer>,
  "estimated_height_m": <float>,
  "co2_absorption_kg_per_year": <float>,
  "co2_absorption_kg_per_month": <float>,
  "validation_is_real_tree": <true|false>,
  "validation_reason": "<why this is/isn't a real tree>",
  "impact_story": "<2-3 sentence engaging story personalized to location>",
  "10_year_projection_kg": <float>,
  "5_year_projection_kg": <float>,
  "1_year_projection_kg": <float>,
  "fun_fact": "<interesting fact>",
  "care_tip": "<care tip for this climate>"
}}"""

    try:
        from huggingface_hub import InferenceClient
        import json
        import re
        
        client = InferenceClient(
            token=HF_TOKEN if HF_TOKEN else None,
            timeout=45,
        )
        
        # Format the image correctly for the VLM API
        image_url = f"data:image/jpeg;base64,{image_base64}"
        
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ]
        
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.chat_completion(
                model="Qwen/Qwen2.5-VL-72B-Instruct",
                messages=messages,
                max_tokens=800,
            )
        )
        
        text = response.choices[0].message.content.strip()
        
        # Try direct parse
        try:
            return json.loads(text)
        except Exception:
            pass
            
        # Try extracting JSON block
        match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
        if match:
            return json.loads(match.group(1))
            
        # Try extracting first {}
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
            
        raise ValueError("Could not parse JSON from response")
        
    except Exception as e:
        raise RuntimeError(f"HF Vision failed: {str(e)}")


def get_available_models() -> list:
    """Return list of available HF models with metadata."""
    return [
        {
            "key": k,
            "label": v["label"],
            "provider": v["provider"],
            "description": v["description"],
            "icon": v["icon"],
        }
        for k, v in HF_MODELS.items()
    ]
