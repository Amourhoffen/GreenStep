"""
Chat router — Multi-LLM chat endpoint
Supports: Gemini (RAG), HuggingFace free models (with retry+fallback),
          Groq Cloud (new — ultra-fast, free), Google ADK Agent
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.rag_service import rag_service

router = APIRouter()

HF_MODEL_KEYS   = {"llama-3-8b", "qwen-2.5-72b", "deepseek-r1-8b", "gemma-3-27b"}
GROQ_MODEL_KEYS = {"groq-llama3-70b", "groq-llama3-8b", "groq-gemma2"}


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    model: Optional[str] = "gemini"


@router.post("")
async def chat(req: ChatRequest):
    """
    Multi-LLM chat endpoint.

    model options:
      gemini           → Gemini 2.0 Flash + RAG (default)
      llama-3-8b       → Llama 3.1 8B via HuggingFace (retry → Gemini fallback)
      qwen-2.5-72b     → Qwen 2.5 72B via HuggingFace (retry → Gemini fallback)
      deepseek-r1-8b   → DeepSeek R1 8B via HuggingFace (retry → Gemini fallback)
      gemma-3-27b      → Gemma 3 27B via HuggingFace (retry → Gemini fallback)
      groq-llama3-70b  → Llama 3.3 70B via Groq Cloud (200+ tok/s, free) ← NEW
      groq-llama3-8b   → Llama 3 8B via Groq Cloud ← NEW
      groq-gemma2      → Gemma 2 9B via Groq Cloud ← NEW
      adk-agent        → Google ADK multi-tool agent
    """
    model_key = req.model or "gemini"
    history   = [{"role": m.role, "content": m.content} for m in (req.history or [])]

    # Retrieve RAG context (used by all models for grounding)
    context = ""
    try:
        context = await rag_service.retrieve(req.message, top_k=3)
    except Exception:
        pass

    # ── HuggingFace Free Models (with 2x retry + silent Gemini fallback) ─────
    if model_key in HF_MODEL_KEYS:
        from services.hf_service import generate_hf_response
        result = await generate_hf_response(
            user_question=req.message,
            retrieved_context=context,
            conversation_history=history,
            model_key=model_key,
        )
        return {
            "response":     result["response"],
            "model":        result["model"],
            "model_key":    model_key,
            "provider":     result["provider"],
            "icon":         result["icon"],
            "fallback_used": result.get("fallback_used", False),
            "sources_used": context[:200] + "..." if len(context) > 200 else context,
        }

    # ── Groq Cloud Models (NEW — ultra-fast, 100% free) ──────────────────────
    if model_key in GROQ_MODEL_KEYS:
        from services.hf_service import generate_groq_response
        result = await generate_groq_response(
            user_question=req.message,
            retrieved_context=context,
            conversation_history=history,
            model_key=model_key,
        )
        return {
            "response":     result["response"],
            "model":        result["model"],
            "model_key":    model_key,
            "provider":     result["provider"],
            "icon":         result["icon"],
            "fallback_used": result.get("fallback_used", False),
            "needs_setup":   result.get("needs_setup", False),
            "sources_used": context[:200] + "..." if len(context) > 200 else context,
        }

    # ── Google ADK Agent ──────────────────────────────────────────────────────
    if model_key == "adk-agent":
        try:
            from services.adk_agent import generate_adk_response
            result = await generate_adk_response(
                user_question=req.message,
                retrieved_context=context,
                conversation_history=history,
            )
            return {
                "response":   result["response"],
                "model":      result["model"],
                "model_key":  "adk-agent",
                "provider":   "Google ADK",
                "icon":       "🤖",
                "tools_used": result.get("tools_used", []),
                "sources_used": context[:200] if context else "",
            }
        except Exception:
            # Fall through to Gemini
            model_key = "gemini"

    # ── Gemini RAG (default + universal fallback) ─────────────────────────────
    try:
        from services.gemini_service import generate_rag_response
        response = await generate_rag_response(
            user_question=req.message,
            retrieved_context=context,
            conversation_history=history,
        )
        return {
            "response":   response,
            "model":      "Gemini 2.0 Flash",
            "model_key":  "gemini",
            "provider":   "Google",
            "icon":       "✨",
            "sources_used": context[:200] + "..." if len(context) > 200 else context,
        }
    except Exception as e:
        return {
            "response": (
                "I'm sorry, all AI models are currently unavailable. "
                "Please check your API keys in the .env file and try again. 🌿"
            ),
            "model":     "Error",
            "model_key": "error",
            "provider":  "None",
            "icon":      "❌",
            "error":     True,
        }


@router.get("/models")
async def list_models():
    """List all available AI models and their status."""
    import os
    gemini_ok = bool(os.getenv("GEMINI_API_KEY", "").strip())
    hf_ok     = bool(os.getenv("HF_TOKEN", "").strip())
    groq_ok   = bool(os.getenv("GROQ_API_KEY", "").strip())

    try:
        from services.adk_agent import is_adk_available
        adk_ok = is_adk_available()
    except Exception:
        adk_ok = False

    models = [
        {
            "key": "gemini",
            "label": "Gemini 2.0 Flash",
            "provider": "Google",
            "description": "Best with RAG grounding — cites IPCC, MoEF, FAO",
            "icon": "✨",
            "free": False,
            "requires": "GEMINI_API_KEY",
            "available": gemini_ok,
        },
        {
            "key": "adk-agent",
            "label": "ADK Climate Agent",
            "provider": "Google ADK",
            "description": "Agentic AI with CO2 calculation tools",
            "icon": "🤖",
            "free": False,
            "requires": "GEMINI_API_KEY + google-adk",
            "available": adk_ok,
        },
        # ── Groq (NEW) ──────────────────────────────────────────────────────
        {
            "key": "groq-llama3-70b",
            "label": "Llama 3.3 70B (Groq) ⚡",
            "provider": "Groq Cloud",
            "description": "Lightning-fast 200+ tok/s · 100% free · Best Groq model",
            "icon": "⚡",
            "free": True,
            "requires": "GROQ_API_KEY (free at console.groq.com)",
            "available": groq_ok,
            "token_configured": groq_ok,
            "badge": "NEW",
        },
        {
            "key": "groq-llama3-8b",
            "label": "Llama 3 8B (Groq)",
            "provider": "Groq Cloud",
            "description": "Ultra-fast inference on Groq hardware",
            "icon": "🚀",
            "free": True,
            "requires": "GROQ_API_KEY",
            "available": groq_ok,
            "token_configured": groq_ok,
        },
        {
            "key": "groq-gemma2",
            "label": "Gemma 2 9B (Groq)",
            "provider": "Groq Cloud",
            "description": "Google Gemma 2 9B on Groq — very fast",
            "icon": "💨",
            "free": True,
            "requires": "GROQ_API_KEY",
            "available": groq_ok,
            "token_configured": groq_ok,
        },
        # ── HuggingFace ─────────────────────────────────────────────────────
        {
            "key": "llama-3-8b",
            "label": "Llama 3.1 8B (HF)",
            "provider": "Meta / HuggingFace",
            "description": "Free HF model — auto-retry + Gemini fallback on failure",
            "icon": "🦙",
            "free": True,
            "requires": "HF_TOKEN (optional, raises rate limits)",
            "available": True,
            "token_configured": hf_ok,
        },
        {
            "key": "qwen-2.5-72b",
            "label": "Qwen 2.5 72B (HF)",
            "provider": "Alibaba / HuggingFace",
            "description": "Powerful 72B instruction model — auto-fallback enabled",
            "icon": "🧠",
            "free": True,
            "requires": "HF_TOKEN (optional)",
            "available": True,
            "token_configured": hf_ok,
        },
        {
            "key": "deepseek-r1-8b",
            "label": "DeepSeek R1 8B (HF)",
            "provider": "DeepSeek / HuggingFace",
            "description": "Strong reasoning model — auto-fallback enabled",
            "icon": "🐋",
            "free": True,
            "requires": "HF_TOKEN (optional)",
            "available": True,
            "token_configured": hf_ok,
        },
        {
            "key": "gemma-3-27b",
            "label": "Gemma 3 27B (HF)",
            "provider": "Google / HuggingFace",
            "description": "Google's open model via HF — auto-fallback enabled",
            "icon": "💎",
            "free": True,
            "requires": "HF_TOKEN (optional)",
            "available": True,
            "token_configured": hf_ok,
        },
    ]

    return {"models": models}
