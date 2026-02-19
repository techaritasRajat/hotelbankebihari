import { useState, useEffect, useCallback } from 'react';
import './AdminPage.css';
import { getEnquiries, clearEnquiries } from '../services/enquiryService';

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'bankeBihari@2024';

const SERVICE_BADGE_COLORS = {
  'Luxury Heritage Experience': 'badge--heritage',
  'Royal & Affordable Palace Stay': 'badge--palace',
  'Authentic Traditional Dining': 'badge--bhojnalay',
  'Corporate Events & Meetings': 'badge--event',
  'Weddings & Engagements': 'badge--event',
  'Banquet Hall & Buffet Services': 'badge--event',
  'Devotional & Kirtan Ceremonies': 'badge--devotional',
  'Cultural & Heritage Events': 'badge--event',
  'General Enquiry': 'badge--general',
};

function formatDateTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/* ─── Login Form ──────────────────────────────────────── */
function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">BB</div>
          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-subtitle">Banke Bihari Maheshwar</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form" autoComplete="off">
          {error && <div className="admin-login-error">{error}</div>}

          <div className="admin-field">
            <label htmlFor="admin-username" className="admin-label">Username</label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="off"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password" className="admin-label">Password</label>
            <div className="admin-password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn admin-btn--primary admin-login-submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Enquiry Card ────────────────────────────────────── */
function EnquiryCard({ enquiry, index }) {
  const badgeClass = SERVICE_BADGE_COLORS[enquiry.service] || 'badge--general';

  return (
    <div className="enquiry-card">
      <div className="enquiry-card-meta">
        <span className="enquiry-card-index">#{index}</span>
        <span className={`enquiry-service-badge ${badgeClass}`}>{enquiry.service || 'N/A'}</span>
        <span className="enquiry-card-time">{formatDateTime(enquiry.submittedAt)}</span>
      </div>
      <div className="enquiry-card-body">
        <div className="enquiry-card-info">
          <div className="enquiry-info-item">
            <span className="enquiry-info-label">Name</span>
            <span className="enquiry-info-value">{enquiry.name}</span>
          </div>
          <div className="enquiry-info-item">
            <span className="enquiry-info-label">Phone</span>
            <a href={`tel:${enquiry.phone}`} className="enquiry-info-value enquiry-info-link">
              {enquiry.phone}
            </a>
          </div>
          <div className="enquiry-info-item">
            <span className="enquiry-info-label">Email</span>
            <a href={`mailto:${enquiry.email}`} className="enquiry-info-value enquiry-info-link">
              {enquiry.email}
            </a>
          </div>
        </div>
        {enquiry.message && (
          <div className="enquiry-card-message">
            <span className="enquiry-info-label">Message</span>
            <p className="enquiry-message-text">{enquiry.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Dashboard ───────────────────────────────────────── */
function Dashboard({ onLogout }) {
  const [enquiries, setEnquiries] = useState([]);
  const [confirmClear, setConfirmClear] = useState(false);

  const loadEnquiries = useCallback(() => {
    setEnquiries(getEnquiries());
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const handleClearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearEnquiries();
    setEnquiries([]);
    setConfirmClear(false);
  };

  const handleCancelClear = () => setConfirmClear(false);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <span className="admin-header-logo">BB</span>
          <div>
            <h1 className="admin-header-title">Admin Panel</h1>
            <p className="admin-header-sub">Banke Bihari Maheshwar</p>
          </div>
        </div>
        <button className="admin-btn admin-btn--outline" onClick={onLogout}>
          Sign Out
        </button>
      </header>

      {/* Stats bar */}
      <div className="admin-stats-bar">
        <div className="admin-stat">
          <span className="admin-stat-value">{enquiries.length}</span>
          <span className="admin-stat-label">Total Enquiries</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-value">
            {enquiries.filter((e) => {
              const d = new Date(e.submittedAt);
              const today = new Date();
              return (
                d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear()
              );
            }).length}
          </span>
          <span className="admin-stat-label">Today</span>
        </div>
        <div className="admin-actions">
          {enquiries.length > 0 && (
            confirmClear ? (
              <div className="admin-confirm-clear">
                <span className="admin-confirm-text">Are you sure?</span>
                <button className="admin-btn admin-btn--danger" onClick={handleClearAll}>
                  Yes, clear all
                </button>
                <button className="admin-btn admin-btn--ghost" onClick={handleCancelClear}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="admin-btn admin-btn--danger-outline" onClick={handleClearAll}>
                Clear All
              </button>
            )
          )}
        </div>
      </div>

      {/* Enquiry list */}
      <main className="admin-main">
        {enquiries.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">📭</div>
            <p className="admin-empty-text">No enquiries received yet.</p>
            <p className="admin-empty-sub">Submitted enquiries from the website will appear here.</p>
          </div>
        ) : (
          <div className="enquiry-list">
            {enquiries.map((enquiry, idx) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                index={enquiries.length - idx}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── AdminPage (root) ────────────────────────────────── */
function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginError('');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default AdminPage;
