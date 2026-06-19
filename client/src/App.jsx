import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DemoPage from './pages/DemoPage';

export default function App() {
  const location = useLocation();

  return (
    <>
      <nav className="topbar">
        <div className="brand">User Analytics</div>
        <div className="navlinks">
          <Link className={location.pathname === '/demo' ? 'nav-active' : ''} to="/demo">Demo</Link>
          <Link className={location.pathname === '/dashboard' ? 'nav-active' : ''} to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/demo" replace />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
