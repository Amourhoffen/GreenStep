"""
Chat router — Multi-LLM chat endpoint
Supports: Gemini (RAG), HuggingFace free models, Google ADK Agent
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.rag_service import rag_service

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    model: Optional[str] = "gemini"   # gemini | mistral-7b | zephyr-7b | phi-3-mini | gemma-2b | adk-agent


@router.post("")
async def chat(req: ChatRequest):
    """
    Multi-LLM chat endpoint.
    - model='gemini'         → Gemini 2.0 Flash with RAG
    - model='llama-3-8b'     → Llama 3.1 8B (free)
    - model='qwen-2.5-72b'   → Qwen 2.5 72B (free)
    - model='deepseek-r1-8b' → DeepSeek R1 8B (free)
    - model='gemma-3-27b'    → Gemma 3 27B (free)
    - model='adk-agent'      → Google ADK multi-tool agent
    """
    model_key = req.model or "gemini"
    history = [{"role": m.role, "content": m.content} for m in (req.history or [])]

    # Retrieve RAG context (used by all models for grounding)
    context = ""
    try:
        context = await rag_service.retrieve(req.message, top_k=3)
    except Exception:
        pass

    # ── HuggingFace Free Models ────────────────────────────────────────────
    if model_key in ("llama-3-8b", "qwen-2.5-72b", "deepseek-r1-8b", "gemma-3-27b"):
        try:
            from services.hf_service import generate_hf_response
            result = await generate_hf_response(
                user_question=req.message,
                retrieved_context=context,
                conversation_history=history,
                model_key=model_key,
            )
            return {
                "response": result["response"],
                "model": result["model"],
                "model_key": model_key,
                "provider": result["provider"],
                "icon": result["icon"],
                "sources_used": context[:200] + "..." if len(context) > 200 else context,
            }
        except Exception as e:
            return {
                "response": f"⚠️ HuggingFace model unavailable: {str(e)}\n\nTip: Add your HF_TOKEN to backend/.env for better rate limits. Switching to Gemini fallback.",
                "model": "Error",
                "model_key": model_key,
                "provider": "HuggingFace",
                "icon": "🤗",
                "error": True,
            }

    # ── Google ADK Agent ───────────────────────────────────────────────────
    if model_key == "adk-agent":
        try:
            from services.adk_agent import generate_adk_response
            result = await generate_adk_response(
                user_question=req.message,
                retrieved_context=context,
                conversation_history=history,
            )
            return {
                "response": result["response"],
                "model": result["model"],
                "model_key": "adk-agent",
                "provider": "Google ADK",
                "icon": "🤖",
                "tools_used": result.get("tools_used", []),
                "sources_used": context[:200] if context else "",
            }
        except Exception as e:
            # Fall through to Gemini
            error_note = f"\n\n[ADK agent unavailable: {str(e)}. Using Gemini instead.]"
            model_key = "gemini"

    # ── Gemini RAG (default) ───────────────────────────────────────────────
    try:
        from services.gemini_service import generate_rag_response
        response = await generate_rag_response(
            user_question=req.message,
            retrieved_context=context,
            conversation_history=history,
        )
        return {
            "response": response,
            "model": "Gemini 2.0 Flash",
            "model_key": "gemini",
            "provider": "Google",
            "icon": "✨",
            "sources_used": context[:200] + "..." if len(context) > 200 else context,
        }
    except Exception as e:
        return {
            "response": f"I apologize, all AI models are currently unavailable. Please check your API keys in the .env file. Error: {str(e)}",
            "model": "Error",
            "model_key": "error",
            "provider": "None",
            "icon": "❌",
            "error": True,
        }


@router.get("/models")
async def list_models():
    """List all available AI models and their status."""
    models = [
        {
            "key": "gemini",
            "label": "Gemini 2.0 Flash",
            "provider": "Google",
            "description": "Best with RAG grounding — cites IPCC, MoEF, FAO",
            "icon": "✨",
            "free": False,
            "requires": "GEMINI_API_KEY",
        },
        {
            "key": "adk-agent",
            "label": "ADK Climate Agent",
            "provider": "Google ADK",
            "description": "Agentic AI with CO2 calculation tools",
            "icon": "🤖",
            "free": False,
            "requires": "GEMINI_API_KEY + google-adk",
        },
        {
            "key": "llama-3-8b",
            "label": "Llama 3.1 8B",
            "provider": "Meta / HF",
            "description": "Best quality free model — detailed responses",
            "icon": "🦙",
            "free": True,
            "requires": "HF_TOKEN (optional, for higher limits)",
        },
        {
            "key": "qwen-2.5-72b",
            "label": "Qwen 2.5 72B",
            "provider": "Alibaba / HF",
            "description": "Powerful instruction tuned model",
            "icon": "🧠",
            "free": True,
            "requires": "HF_TOKEN (optional)",
        },
        {
            "key": "deepseek-r1-8b",
            "label": "DeepSeek R1 8B",
            "provider": "DeepSeek / HF",
            "description": "Strong reasoning model",
            "icon": "🐋",
            "free": True,
            "requires": "HF_TOKEN (optional)",
        },
        {
            "key": "gemma-3-27b",
            "label": "Gemma 3 27B",
            "provider": "Google / HF",
            "description": "Google's lightweight open model",
            "icon": "💎",
            "free": True,
            "requires": "HF_TOKEN (optional)",
        },
    ]
    
    import os
    gemini_ok = bool(os.getenv("GEMINI_API_KEY", "").strip())
    hf_ok = bool(os.getenv("HF_TOKEN", "").strip())
    
    try:
        from services.adk_agent import is_adk_available
        adk_ok = is_adk_available()
    except Exception:
        adk_ok = False
    
    for m in models:
        if m["key"] == "gemini":
            m["available"] = gemini_ok
        elif m["key"] == "adk-agent":
            m["available"] = adk_ok
        else:
            m["available"] = True  # HF models work without token (with rate limits)
            m["token_configured"] = hf_ok
    
    return {"models": models}
