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
    api.getSessions().then(setSessions).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!selectedSession) return;
    api.getSessionEvents(selectedSession).then(setSessionEvents).catch((e) => setError(e.message));
  }, [selectedSession]);

  useEffect(() => {
    api.getHeatmap(pageUrl).then(setHeatmap).catch((e) => setError(e.message));
  }, [pageUrl]);

  return (
    <div className="page-shell dashboard-shell">
      <header className="hero compact">
        <p className="eyebrow">Analytics Dashboard</p>
        <h1>Sessions, journeys, and click heatmaps</h1>
        <p className="muted">Choose a session to inspect the ordered events. Choose a page to visualize clicks.</p>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

<div className="dashboard-grid">
  <section className="panel">
    {/* Sessions */}
  </section>

  <section className="panel">
    {/* User Journey */}
  </section>
</div>

<section className="panel heatmap-panel-full">
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

  <div className="heatmap-wrapper-full">
    <HeatmapDots clicks={heatmap.clicks || []} />
  </div>

  <div className="muted small">
    {(heatmap.clicks || []).length} click points rendered for {pageUrl}
  </div>
</section>
      </div>
    </div>
  );
}
