"""
HuggingFace Inference Service — Free LLMs for GreenStep
Uses huggingface_hub InferenceClient with the free serverless Inference API.

Retry & Fallback Strategy (NEW):
  1. Try HF inference up to MAX_RETRIES times with exponential back-off.
  2. If all retries fail → silently call Gemini fallback.
  3. User NEVER sees the ugly red error box — they get a response from Gemini
     and a small "(via Gemini fallback)" badge is set in the response dict.

Free models used:
  - meta-llama/Llama-3.1-8B-Instruct    (default, best quality)
  - Qwen/Qwen2.5-72B-Instruct            (powerful, great for climate queries)
  - deepseek-ai/DeepSeek-R1-Distill-Llama-8B
  - google/gemma-3-27b-it

Groq models (NEW — 100% free, 200+ tokens/sec):
  - llama3-8b-8192       (Llama 3 8B on Groq)
  - llama-3.3-70b-versatile  (Llama 3.3 70B on Groq — BEST)
  - gemma2-9b-it         (Google Gemma 2 9B on Groq)
"""
import os
import asyncio
import logging
from typing import Optional

logger = logging.getLogger(__name__)

HF_TOKEN   = os.getenv("HF_TOKEN", "").strip()
GROQ_KEY   = os.getenv("GROQ_API_KEY", "").strip()
MAX_RETRIES = 2          # number of HF retry attempts
RETRY_DELAY = 1.5        # seconds between retries

# ─── HuggingFace Models ───────────────────────────────────────────────────────
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

# ─── Groq Models (NEW) ────────────────────────────────────────────────────────
GROQ_MODELS = {
    "groq-llama3-70b": {
        "id": "llama-3.3-70b-versatile",
        "label": "Llama 3.3 70B (Groq)",
        "provider": "Groq Cloud",
        "description": "Lightning-fast 70B model — 200+ tokens/sec, completely free",
        "icon": "⚡",
        "max_tokens": 1024,
    },
    "groq-llama3-8b": {
        "id": "llama3-8b-8192",
        "label": "Llama 3 8B (Groq)",
        "provider": "Groq Cloud",
        "description": "Ultra-fast inference on Groq hardware",
        "icon": "🚀",
        "max_tokens": 1024,
    },
    "groq-gemma2": {
        "id": "gemma2-9b-it",
        "label": "Gemma 2 9B (Groq)",
        "provider": "Groq Cloud",
        "description": "Google Gemma 2 9B running on Groq — very fast",
        "icon": "💨",
        "max_tokens": 1024,
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
    """Build messages list for chat completion."""
    messages = [{"role": "system", "content": GREENSTEP_SYSTEM_PROMPT}]
    if context and len(context) > 50:
        messages.append({
            "role": "system",
            "content": f"Relevant knowledge base context:\n{context[:1500]}"
        })
    for msg in history[-6:]:
        messages.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })
    messages.append({"role": "user", "content": user_question})
    return messages


# ─────────────────────────────────────────────────────────────────────────────
# Internal: single HF attempt (no retry)
# ─────────────────────────────────────────────────────────────────────────────
async def _try_hf_once(messages: list, model_id: str, max_tokens: int) -> str:
    """Single HuggingFace inference attempt. Raises on failure."""
    from huggingface_hub import InferenceClient

    client = InferenceClient(
        token=HF_TOKEN if HF_TOKEN else None,
        timeout=30,
    )
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: client.chat_completion(
            model=model_id,
            messages=messages,
            max_tokens=max_tokens,
            temperature=0.7,
            stream=False,
        )
    )
    return response.choices[0].message.content.strip()


# ─────────────────────────────────────────────────────────────────────────────
# Internal: single Groq attempt  (uses official groq SDK)
# ─────────────────────────────────────────────────────────────────────────────
async def _try_groq_once(messages: list, model_id: str, max_tokens: int) -> str:
    """Single Groq inference attempt using official AsyncGroq client."""
    try:
        from groq import AsyncGroq  # official SDK — pip install groq
    except ImportError:
        raise RuntimeError(
            "groq package not installed. Add 'groq>=0.9.0' to requirements.txt "
            "and redeploy."
        )

    client = AsyncGroq(api_key=GROQ_KEY)
    chat_completion = await client.chat.completions.create(
        model=model_id,
        messages=messages,
        max_tokens=max_tokens,
        temperature=0.7,
    )
    return chat_completion.choices[0].message.content.strip()


# ─────────────────────────────────────────────────────────────────────────────
# Internal: Gemini silent fallback
# ─────────────────────────────────────────────────────────────────────────────
async def _gemini_fallback(user_question: str, retrieved_context: str, history: list) -> str:
    """Call Gemini silently. Returns empty string on failure."""
    try:
        from services.gemini_service import generate_rag_response
        return await generate_rag_response(
            user_question=user_question,
            retrieved_context=retrieved_context,
            conversation_history=history,
        )
    except Exception as e:
        logger.warning(f"[GreenStep] Gemini fallback also failed: {e}")
        return ""


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC: generate_hf_response  (with retry + silent Gemini fallback)
# ─────────────────────────────────────────────────────────────────────────────
async def generate_hf_response(
    user_question: str,
    retrieved_context: str = "",
    conversation_history: list = [],
    model_key: str = "llama-3-8b",
) -> dict:
    """
    Generate a response using HuggingFace Inference API (free tier).

    Retry logic:
      - Attempts up to MAX_RETRIES times with RETRY_DELAY seconds between each.
      - On total HF failure → silently falls back to Gemini.
      - User always gets a response, never a raw error.

    Returns dict with 'response', 'model', 'provider', 'icon', and optional
    'fallback_used' = True when Gemini answered instead of HF.
    """
    model_info = HF_MODELS.get(model_key, HF_MODELS["llama-3-8b"])
    model_id   = model_info["id"]
    messages   = _build_messages(user_question, retrieved_context, conversation_history)

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"[HF] Attempt {attempt}/{MAX_RETRIES} — model={model_id}")
            text = await _try_hf_once(messages, model_id, model_info["max_tokens"])
            return {
                "response": text,
                "model": model_info["label"],
                "model_key": model_key,
                "provider": model_info["provider"],
                "icon": model_info["icon"],
                "fallback_used": False,
            }
        except Exception as e:
            last_error = e
            logger.warning(f"[HF] Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY * attempt)  # 1.5s, 3s

    # ── All HF retries exhausted → silent Gemini fallback ────────────────────
    logger.warning(f"[HF] All {MAX_RETRIES} retries failed. Engaging Gemini fallback.")
    gemini_text = await _gemini_fallback(user_question, retrieved_context, conversation_history)

    if gemini_text:
        return {
            "response": gemini_text,
            "model": f"{model_info['label']} → Gemini 2.0 Flash",
            "model_key": model_key,
            "provider": "Gemini (auto-fallback)",
            "icon": "✨",
            "fallback_used": True,
        }

    # ── Both HF and Gemini failed — return graceful message ──────────────────
    return {
        "response": (
            "I'm experiencing high demand right now and couldn't reach the AI models. "
            "Please try again in a few seconds, or switch to **Gemini** from the model selector "
            "for an instant response. 🌿"
        ),
        "model": "Unavailable",
        "model_key": model_key,
        "provider": "None",
        "icon": "⏳",
        "fallback_used": True,
        "error": True,
    }


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC: generate_groq_response (NEW — Groq Cloud, 100% free)
# ─────────────────────────────────────────────────────────────────────────────
async def generate_groq_response(
    user_question: str,
    retrieved_context: str = "",
    conversation_history: list = [],
    model_key: str = "groq-llama3-70b",
) -> dict:
    """
    Generate a response using Groq Cloud API (free, 200+ tokens/sec).
    Uses the official `groq` Python SDK (AsyncGroq).
    Falls back to Gemini silently if Groq fails.
    Requires GROQ_API_KEY in backend/.env
      → Get a FREE key at https://console.groq.com → API Keys → Create key
    """
    if not GROQ_KEY:
        # Don't silently fall to Gemini when the user explicitly picked Groq;
        # return a friendly message telling them exactly what to do.
        return {
            "response": (
                "⚡ **Groq API key not configured.**\n\n"
                "Groq is 100% free and gives you 200+ tokens/sec on Llama 3.3 70B.\n\n"
                "**Setup in 2 minutes:**\n"
                "1. Visit [console.groq.com](https://console.groq.com) and sign up (free)\n"
                "2. Go to **API Keys → Create API Key**\n"
                "3. Copy the key (starts with `gsk_...`)\n"
                "4. Add `GROQ_API_KEY=gsk_...` to `backend/.env`\n"
                "5. Redeploy the backend\n\n"
                "Meanwhile, switch to **Gemini** or another model from the selector. 🌿"
            ),
            "model": "Groq (not configured)",
            "model_key": model_key,
            "provider": "Groq Cloud",
            "icon": "⚡",
            "fallback_used": False,
            "needs_setup": True,
        }

    model_info = GROQ_MODELS.get(model_key, GROQ_MODELS["groq-llama3-70b"])
    messages   = _build_messages(user_question, retrieved_context, conversation_history)

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"[Groq] Attempt {attempt}/{MAX_RETRIES} — model={model_info['id']}")
            text = await _try_groq_once(messages, model_info["id"], model_info["max_tokens"])
            return {
                "response": text,
                "model": model_info["label"],
                "model_key": model_key,
                "provider": model_info["provider"],
                "icon": model_info["icon"],
                "fallback_used": False,
            }
        except Exception as e:
            last_error = e
            logger.warning(f"[Groq] Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY * attempt)

    # Groq failed after retries → silent Gemini fallback
    logger.warning(f"[Groq] All retries failed ({last_error}). Engaging Gemini fallback.")
    gemini_text = await _gemini_fallback(user_question, retrieved_context, conversation_history)

    if gemini_text:
        return {
            "response": gemini_text,
            "model": f"{model_info['label']} → Gemini 2.0 Flash",
            "model_key": model_key,
            "provider": "Gemini (auto-fallback)",
            "icon": "✨",
            "fallback_used": True,
        }

    return {
        "response": (
            "All AI services are currently at capacity. Please try again in a moment. 🌿"
        ),
        "model": "Unavailable",
        "model_key": model_key,
        "provider": "None",
        "icon": "⏳",
        "fallback_used": True,
        "error": True,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Vision analysis (unchanged logic, added retry)
# ─────────────────────────────────────────────────────────────────────────────
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

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            from huggingface_hub import InferenceClient
            import json
            import re

            client = InferenceClient(
                token=HF_TOKEN if HF_TOKEN else None,
                timeout=45,
            )
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

            try:
                return json.loads(text)
            except Exception:
                pass
            match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
            match = re.search(r"\{.*\}", text, re.DOTALL)
            if match:
                return json.loads(match.group(0))
            raise ValueError("Could not parse JSON from response")

        except Exception as e:
            last_error = e
            logger.warning(f"[HF Vision] Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY * attempt)

    raise RuntimeError(f"HF Vision failed after {MAX_RETRIES} retries: {last_error}")


def get_available_models() -> list:
    """Return list of available HF + Groq models with metadata."""
    models = [
        {
            "key": k,
            "label": v["label"],
            "provider": v["provider"],
            "description": v["description"],
            "icon": v["icon"],
            "backend": "huggingface",
        }
        for k, v in HF_MODELS.items()
    ]
    groq_models = [
        {
            "key": k,
            "label": v["label"],
            "provider": v["provider"],
            "description": v["description"],
            "icon": v["icon"],
            "backend": "groq",
        }
        for k, v in GROQ_MODELS.items()
    ]
    return models + groq_models
