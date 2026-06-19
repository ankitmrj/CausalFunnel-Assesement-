(function () {
  const BASE_URL = window.__UA_API_BASE__ || 'http://localhost:5000/api';
  const STORAGE_KEY = 'ua_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }

  function send(payload) {
    fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }

  send({
    session_id: sessionId,
    event_type: 'page_view',
    page_url: location.pathname,
    timestamp: new Date().toISOString(),
  });

  window.addEventListener('click', (event) => {
    send({
      session_id: sessionId,
      event_type: 'click',
      page_url: location.pathname,
      timestamp: new Date().toISOString(),
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    });
  });
})();
