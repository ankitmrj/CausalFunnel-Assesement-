import TrackerScript from '../components/TrackerScript';

export default function DemoPage() {
  return (
    <div className="page-shell">
      <TrackerScript pageUrl="/demo" />
      <header className="hero">
        <p className="eyebrow">Demo Store</p>
        <h1>Track real user interactions on this page</h1>
        <p className="muted">
          Click the buttons, cards, and link below. The tracker sends page view and click events with coordinates.
        </p>
      </header>

      <div className="demo-grid">
        <button className="card button-card">Add to Cart</button>
        <button className="card button-card primary">Buy Now</button>
        <a className="card link-card" href="#offers">View Offers</a>
        <div className="card image-card">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" alt="Sneaker" />
        </div>
      </div>

      <section id="offers" className="info-panel">
        <h2>Top Picks</h2>
        <p>Any clicks on these elements will be recorded and later shown in the dashboard.</p>
      </section>
    </div>
  );
}
