/**
 * Frontend Gemini Client
 * Calls the Google Gemini API directly from the browser.
 * Falls back to rich offline responses if the API key is not configured.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let _genAI = null;
let _model = null;

function getModel() {
  if (!API_KEY) return null;
  if (_model) return _model;
  try {
    _genAI = new GoogleGenerativeAI(API_KEY);
    _model = _genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    return _model;
  } catch (e) {
    console.warn('[GeminiClient] Failed to initialize model:', e.message);
    return null;
  }
}

// ─── Knowledge base for offline fallback ────────────────────────────────────
const KNOWLEDGE_BASE = `
You are GreenStep's AI climate advisor. Use these facts:
TRANSPORT: Petrol car (India): 0.192 kg CO₂/km | Diesel: 0.171 | Auto-rickshaw (CNG): 0.267 | Metro: 0.041 | Bus: 0.089 | Flight (economy, short-haul): 0.255 | Bike (petrol): 0.113
ELECTRICITY: India avg grid: 0.716 kg CO₂/kWh | Solar: 0.048 kg CO₂/kWh (lifecycle) | Northern grid (Delhi): 0.82 | Southern grid (Karnataka): 0.65
FOOD: Beef: 27.0 kg CO₂/kg | Chicken: 6.9 | Fish: 5.4 | Eggs: 4.5 | Dairy: 3.2 | Rice: 2.7 | Lentils: 0.9
TREES (India): Neem: 21.7 kg CO₂/yr | Peepal: 22.6 | Banyan: 28.3 | Gulmohar: 18.4 | Indian Rosewood: 24.1
INDIA CONTEXT: Per capita CO₂: 1.9 tonnes/yr | Urban Indian: 4.5–6.5 kg CO₂/day | Carbon neutral day: ≤2.0 kg/day
Sources: IPCC AR6 2022, India MoEF, FAO 2023, CEA 2023
`;

const SYSTEM_PROMPT = `${KNOWLEDGE_BASE}

You are a friendly, knowledgeable carbon footprint advisor for India. 
Rules:
- Always cite sources like [IPCC AR6], [India MoEF], [FAO]
- Be specific with numbers and calculations
- End each response with one practical action the user can take today
- Use emojis sparingly but effectively (🌱 🌍 ♻️)
- Format with **bold** for key numbers
- Keep responses concise but informative (150-300 words)`;

/**
 * Send a chat message to Gemini and get a response.
 * @param {string} message - User's message
 * @param {Array} history - Previous messages [{role, content}]
 * @param {function} onStream - Optional streaming callback (receives partial text)
 * @returns {Promise<string>} - Full response text
 */
export async function sendGeminiChat(message, history = [], onStream = null) {
  const model = getModel();
  
  if (!model) {
    throw new Error('Gemini API key not configured');
  }

  // Build conversation history for Gemini
  const chatHistory = history.slice(-10).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
    systemInstruction: SYSTEM_PROMPT,
  });

  if (onStream) {
    // Streaming mode
    const result = await chat.sendMessageStream(message);
    let fullText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onStream(fullText);
    }
    return fullText;
  } else {
    // Non-streaming mode
    const result = await chat.sendMessage(message);
    return result.response.text();
  }
}

/**
 * Generate AI-powered CO₂ reduction tip for an activity
 */
export async function getAIReductionTip(category, activityType) {
  const model = getModel();
  if (!model) return null;

  try {
    const prompt = `Give ONE specific, actionable tip to reduce carbon footprint for: ${category} → ${activityType}. 
Include the potential CO₂ saving. Be concise (2 sentences max). Use Indian context. No preamble.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return null;
  }
}

/**
 * Analyze tree photo using Gemini Vision
 */
export async function analyzeTreeWithGemini(imageBase64, location, weatherData) {
  const model = getModel();
  if (!model) throw new Error('Gemini API key not configured');

  const prompt = `You are an expert botanist and climate scientist. Analyze this tree photo.

Location: ${location}
Temperature: ${weatherData.temperature_c || 30}°C
Humidity: ${weatherData.humidity_pct || 65}%
Annual rainfall: ${weatherData.rainfall_mm_year || 1000}mm/year

Return ONLY valid JSON (no markdown, no explanation):
{
  "species": "<common name> (<scientific name>)",
  "species_common": "<common name>",
  "confidence_pct": <integer 0-100>,
  "estimated_age_years": <integer>,
  "estimated_height_m": <float>,
  "co2_absorption_kg_per_year": <float, climate-adjusted>,
  "co2_absorption_kg_per_month": <float>,
  "validation_is_real_tree": <true|false>,
  "validation_reason": "<brief reason>",
  "impact_story": "<2-3 sentence story about this tree's environmental impact>",
  "10_year_projection_kg": <float>,
  "5_year_projection_kg": <float>,
  "1_year_projection_kg": <float>,
  "fun_fact": "<interesting fact about this species>",
  "care_tip": "<one care tip for this tree in given climate>"
}`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: 'image/jpeg',
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const text = result.response.text();
  
  // Parse JSON from response
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Could not parse Gemini response');
  }
}

export const isGeminiConfigured = () => !!API_KEY;
