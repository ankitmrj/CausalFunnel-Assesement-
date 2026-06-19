const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}

export const api = {
  postEvent: (payload) => request('/events', { method: 'POST', body: JSON.stringify(payload) }),
  getSessions: () => request('/sessions'),
  getSessionEvents: (sessionId) => request(`/sessions/${encodeURIComponent(sessionId)}/events`),
  getHeatmap: (pageUrl) => request(`/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`)
};
