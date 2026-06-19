import { useEffect } from 'react';
import { api } from '../services/api';

function getSessionId() {
  const key = 'ua_session_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function TrackerScript({ pageUrl }) {
  useEffect(() => {
    const session_id = getSessionId();
    const timestamp = new Date().toISOString();

    api.postEvent({
      session_id,
      event_type: 'page_view',
      page_url: pageUrl,
      timestamp
    }).catch(console.error);

    const handleClick = (e) => {
      const x = Math.round(e.clientX);
      const y = Math.round(e.clientY);
      api.postEvent({
        session_id,
        event_type: 'click',
        page_url: pageUrl,
        timestamp: new Date().toISOString(),
        x,
        y
      }).catch(console.error);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [pageUrl]);

  return null;
}
