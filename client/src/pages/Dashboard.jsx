import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import HeatmapDots from '../components/HeatmapDots';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionEvents, setSessionEvents] = useState([]);
  const [pageUrl, setPageUrl] = useState('/demo');
  const [heatmap, setHeatmap] = useState({ clicks: [] });
  const [error, setError] = useState('');

  const pages = useMemo(() => ['/demo'], []);

  useEffect(() => {
    api.getSessions()
      .then(setSessions)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!selectedSession) return;

    api.getSessionEvents(selectedSession)
      .then(setSessionEvents)
      .catch((e) => setError(e.message));
  }, [selectedSession]);

  useEffect(() => {
    api.getHeatmap(pageUrl)
      .then(setHeatmap)
      .catch((e) => setError(e.message));
  }, [pageUrl]);

  return (
    <div className="page-shell dashboard-shell">
      <header className="hero compact">
        <p className="eyebrow">Analytics Dashboard</p>
        <h1>Sessions, Journeys & Heatmaps</h1>
        <p className="muted">
          Explore tracked sessions, user journeys and click heatmaps.
        </p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Row 1 */}
      <div className="dashboard-grid">
        {/* Sessions */}
        <section className="panel">
          <div className="panel-header">
            <h2>Sessions</h2>
            <span className="badge">{sessions.length}</span>
          </div>

          <div className="list">
            {sessions.map((session) => (
              <button
                key={session.session_id}
                className={`list-item ${
                  selectedSession === session.session_id ? 'active' : ''
                }`}
                onClick={() => setSelectedSession(session.session_id)}
              >
                <strong>
                  {session.session_id.slice(0, 8)}
                </strong>

                <span>
                  {session.event_count} events
                </span>
              </button>
            ))}

            {!sessions.length && (
              <p className="muted">
                No sessions available.
              </p>
            )}
          </div>
        </section>

        {/* User Journey */}
        <section className="panel">
          <div className="panel-header">
            <h2>User Journey</h2>
            <span className="badge">
              {sessionEvents.length}
            </span>
          </div>

          <div className="timeline">
            {selectedSession ? (
              sessionEvents.map((event, idx) => (
                <div
                  key={`${event._id || idx}`}
                  className="timeline-item"
                >
                  <div className="timeline-dot" />

                  <div>
                    <div>
                      <strong>{event.event_type}</strong>
                      {' — '}
                      {event.page_url}
                    </div>

                    <div className="muted small">
                      {new Date(
                        event.timestamp
                      ).toLocaleString()}
                    </div>

                    {event.event_type === 'click' && (
                      <div className="muted small">
                        x: {event.x}, y: {event.y}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="muted">
                Select a session to view its journey.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Row 2 - Full Width Heatmap */}
      <section className="panel heatmap-panel">
        <div className="panel-header">
          <h2>Heatmap</h2>

          <select
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <div className="heatmap-wrapper">
          <HeatmapDots
            clicks={heatmap.clicks || []}
          />
        </div>

        <div className="muted small">
          {(heatmap.clicks || []).length} click points
          rendered for {pageUrl}
        </div>
      </section>
    </div>
  );
}
