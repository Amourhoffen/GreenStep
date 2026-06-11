const API_BASE = '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'API error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
};

// ── Activities ──────────────────────────────────────────────
export const calculateCO2 = async (payload) => {
  const res = await fetch(`${API_BASE}/activities/calculate-co2`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const saveActivity = async (activity) => {
  const res = await fetch(`${API_BASE}/activities/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity),
  });
  return handleResponse(res);
};

// ── Trees ────────────────────────────────────────────────────
export const analyzeTree = async (imageBase64, location, weatherData) => {
  const res = await fetch(`${API_BASE}/trees/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_base64: imageBase64, location, ...weatherData }),
  });
  return handleResponse(res);
};

export const saveTree = async (treeData) => {
  const res = await fetch(`${API_BASE}/trees/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treeData),
  });
  return handleResponse(res);
};

// ── Weather ──────────────────────────────────────────────────
export const getWeather = async (city) => {
  const res = await fetch(`${API_BASE}/weather/${encodeURIComponent(city)}`);
  return handleResponse(res);
};

// ── Maps ─────────────────────────────────────────────────────
export const getDistance = async (origin, destination) => {
  const params = new URLSearchParams({ origin, destination });
  const res = await fetch(`${API_BASE}/maps/distance?${params}`);
  return handleResponse(res);
};

// ── Chat ─────────────────────────────────────────────────────
export const sendChatMessage = async (message, history = [], model = 'gemini') => {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, model }),
  });
  return handleResponse(res);
};

export const getAvailableModels = async () => {
  const res = await fetch(`${API_BASE}/chat/models`);
  return handleResponse(res);
};

// ── Community ────────────────────────────────────────────────
export const getCommunityFeed = async (page = 1) => {
  const res = await fetch(`${API_BASE}/community/feed?page=${page}&limit=20`);
  return handleResponse(res);
};

export const verifyAndScorePost = async (imageBase64, activityText, offsetText) => {
  const res = await fetch(`${API_BASE}/community/verify-and-score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_base64: imageBase64,
      activity_text: activityText,
      offset_text: offsetText
    }),
  });
  return handleResponse(res);
};

export const createCommunityPost = async (post) => {
  const res = await fetch(`${API_BASE}/community/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return handleResponse(res);
};

export const deleteCommunityPost = async (postId) => {
  const res = await fetch(`${API_BASE}/community/post/${postId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const toggleLikePost = async (postId, userId = 'anonymous') => {
  const res = await fetch(`${API_BASE}/community/like/${postId}?user_id=${encodeURIComponent(userId)}`, {
    method: 'POST',
  });
  return handleResponse(res);
};

export const getLeaderboard = async () => {
  const res = await fetch(`${API_BASE}/community/leaderboard`);
  return handleResponse(res);
};

export const getEcoTasks = async () => {
  const res = await fetch(`${API_BASE}/community/tasks`);
  return handleResponse(res);
};

// ── Videos ───────────────────────────────────────────────────
export const searchVideos = async (query) => {
  const res = await fetch(`${API_BASE}/videos/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
};

export const getCommunityStats = async () => {
  const res = await fetch(`${API_BASE}/community/stats`);
  return handleResponse(res);
};

export const addCommunityComment = async (postId, userName, text) => {
  const res = await fetch(`${API_BASE}/community/comment/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_name: userName, text }),
  });
  return handleResponse(res);
};
