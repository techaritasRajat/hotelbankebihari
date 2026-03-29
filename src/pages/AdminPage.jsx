import { useState, useEffect, useCallback } from 'react';
import './AdminPage.css';
import UIcon from '../components/ui/UIcon';
import {
  adminLogin,
  getStats,
  getSubmissions,
  getPersons,
  getPersonSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../services/apiService';

const TOKEN_KEY = 'bb_admin_token';

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

const TYPE_LABELS = { enquiry: 'Enquiry', booking: 'Booking', feedback: 'Feedback', contact: 'Contact' };
const TYPE_COLORS = { enquiry: '#3b82f6', booking: '#8b5cf6', feedback: '#f59e0b', contact: '#10b981' };
const STATUS_COLORS = { new: '#ef4444', read: '#f59e0b', resolved: '#10b981' };

function Badge({ label, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: color,
    }}>
      {label}
    </span>
  );
}

/* ─── Login ──────────────────────────────────────────────────────────────── */
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminLogin(username, password);
      sessionStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
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
            <input id="admin-username" type="text" className="admin-input" value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-password" className="admin-label">Password</label>
            <div className="admin-password-wrapper">
              <input id="admin-password" type={showPw ? 'text' : 'password'} className="admin-input"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" autoComplete="new-password" required />
              <button type="button" className="admin-password-toggle"
                onClick={() => setShowPw((v) => !v)} aria-label="Toggle password">
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <button type="submit" className="admin-btn admin-btn--primary admin-login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────────────────── */
function StatsBar({ stats }) {
  if (!stats) return null;
  const cards = [
    { label: 'Total', value: stats.total },
    { label: 'Today', value: stats.today },
    { label: 'Unread', value: stats.byStatus?.new ?? 0 },
    { label: 'Resolved', value: stats.byStatus?.resolved ?? 0 },
    { label: 'Enquiries', value: stats.byType?.enquiry ?? 0 },
    { label: 'Bookings', value: stats.byType?.booking ?? 0 },
    { label: 'Feedback', value: stats.byType?.feedback ?? 0 },
    { label: 'Contacts', value: stats.byType?.contact ?? 0 },
  ];
  return (
    <div className="admin-stats-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
      {cards.map(({ label, value }) => (
        <div key={label} className="admin-stat" style={{ minWidth: '80px' }}>
          <span className="admin-stat-value">{value}</span>
          <span className="admin-stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Submission Row ────────────────────────────────────────────────────── */
function SubmissionRow({ item, token, onRefresh }) {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (status) => {
    setUpdating(true);
    try {
      await updateSubmissionStatus(token, item.PK, item.SK, status);
      onRefresh();
    } catch (e) { console.error(e); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this submission?')) return;
    setDeleting(true);
    try {
      await deleteSubmission(token, item.PK, item.SK);
      onRefresh();
    } catch (e) { console.error(e); }
    finally { setDeleting(false); }
  };

  const d = item.data || {};
  return (
    <div className="enquiry-card" style={{ marginBottom: '12px' }}>
      <div className="enquiry-card-meta">
        <Badge label={TYPE_LABELS[item.submissionType] || item.submissionType} color={TYPE_COLORS[item.submissionType] || '#6b7280'} />
        <Badge label={item.status} color={STATUS_COLORS[item.status] || '#6b7280'} />
        <span className="enquiry-card-time">{formatDateTime(item.createdAt)}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          {item.status !== 'read' && (
            <button className="admin-btn admin-btn--ghost" style={{ padding: '4px 10px', fontSize: '12px' }}
              onClick={() => handleStatus('read')} disabled={updating}>Mark Read</button>
          )}
          {item.status !== 'resolved' && (
            <button className="admin-btn admin-btn--outline" style={{ padding: '4px 10px', fontSize: '12px' }}
              onClick={() => handleStatus('resolved')} disabled={updating}>Resolve</button>
          )}
          <button className="admin-btn admin-btn--danger" style={{ padding: '4px 10px', fontSize: '12px' }}
            onClick={handleDelete} disabled={deleting}>Delete</button>
        </div>
      </div>
      <div className="enquiry-card-body">
        <div className="enquiry-card-info">
          <div className="enquiry-info-item">
            <span className="enquiry-info-label">Name</span>
            <span className="enquiry-info-value">{d.name || '—'}</span>
          </div>
          {d.phone && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Phone</span>
              <a href={`tel:${d.phone}`} className="enquiry-info-value enquiry-info-link">{d.phone}</a>
            </div>
          )}
          {d.email && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Email</span>
              <a href={`mailto:${d.email}`} className="enquiry-info-value enquiry-info-link">{d.email}</a>
            </div>
          )}
          {d.service && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Service</span>
              <span className="enquiry-info-value">{d.service}</span>
            </div>
          )}
          {d.checkIn && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Check-in</span>
              <span className="enquiry-info-value">{d.checkIn} → {d.checkOut}</span>
            </div>
          )}
          {d.adults && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Guests</span>
              <span className="enquiry-info-value">{d.adults} adults, {d.children || 0} children</span>
            </div>
          )}
          {d.rating && (
            <div className="enquiry-info-item">
              <span className="enquiry-info-label">Rating</span>
              <span className="enquiry-info-value">{'★'.repeat(d.rating)}{'☆'.repeat(5 - d.rating)}</span>
            </div>
          )}
        </div>
        {d.message && (
          <div className="enquiry-card-message">
            <span className="enquiry-info-label">Message</span>
            <p className="enquiry-message-text">{d.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Person Card ───────────────────────────────────────────────────────── */
function PersonCard({ person, token }) {
  const [expanded, setExpanded] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubmissions = useCallback(async () => {
    if (!expanded) return;
    setLoading(true);
    try {
      const res = await getPersonSubmissions(token, person.PK);
      setSubmissions(res.submissions || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [expanded, token, person.PK]);

  useEffect(() => { loadSubmissions(); }, [loadSubmissions]);

  const initials = (person.name || '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const types = person.submissionTypes || [];

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '12px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', cursor: 'pointer' }}
        onClick={() => setExpanded((v) => !v)}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '16px',
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{person.name}</div>
          <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {person.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UIcon name="fi-sr-phone" size="0.875rem" color="#6b7280" /> {person.phone}</span>}
            {person.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UIcon name="fi-sr-envelope" size="0.875rem" color="#6b7280" /> {person.email}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {types.map((t) => (
            <Badge key={t} label={TYPE_LABELS[t] || t} color={TYPE_COLORS[t] || '#6b7280'} />
          ))}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '18px', color: '#3b82f6' }}>{person.submissionCount}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>submissions</div>
        </div>
        <div style={{ color: '#9ca3af', flexShrink: 0 }}>
          <UIcon name={expanded ? 'fi-sr-angle-up' : 'fi-sr-angle-down'} size="1rem" color="#9ca3af" />
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #f3f4f6', padding: '16px 20px', background: '#f9fafb' }}>
          {loading ? (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading submissions…</p>
          ) : submissions.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No submissions found.</p>
          ) : (
            submissions.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '12px 16px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <Badge label={TYPE_LABELS[s.submissionType] || s.submissionType} color={TYPE_COLORS[s.submissionType] || '#6b7280'} />
                  <Badge label={s.status} color={STATUS_COLORS[s.status] || '#6b7280'} />
                  <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: 'auto' }}>{formatDateTime(s.createdAt)}</span>
                </div>
                {s.data?.message && <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>{s.data.message}</p>}
                {s.data?.checkIn && <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>📅 {s.data.checkIn} → {s.data.checkOut} | {s.data.adults} adults</p>}
                {s.data?.rating && <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>{'★'.repeat(s.data.rating)}{'☆'.repeat(5 - s.data.rating)}</p>}
                {s.data?.service && <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Service: {s.data.service}</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────────────────── */
function Dashboard({ token, onLogout }) {
  const [activeView, setActiveView] = useState('submissions');
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadStats = useCallback(async () => {
    try { setStats(await getStats(token)); } catch (e) { console.error(e); }
  }, [token]);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = activeTab !== 'all' ? { type: activeTab } : {};
      const res = await getSubmissions(token, { ...params, limit: 100 });
      const sorted = [...(res.items || [])].sort((a, b) => b.createdAt > a.createdAt ? 1 : -1);
      setSubmissions(sorted);
    } catch (e) { setError(e.message || 'Failed to load submissions'); }
    finally { setLoading(false); }
  }, [token, activeTab]);

  const loadPersons = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getPersons(token, { limit: 100 });
      setPersons(res.items || []);
    } catch (e) { setError(e.message || 'Failed to load persons'); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { loadStats(); }, [loadStats]);

  useEffect(() => {
    if (activeView === 'submissions') loadSubmissions();
    else loadPersons();
  }, [activeView, loadSubmissions, loadPersons]);

  const handleRefresh = () => {
    loadStats();
    if (activeView === 'submissions') loadSubmissions();
    else loadPersons();
  };

  const TABS = ['all', 'enquiry', 'booking', 'feedback', 'contact'];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-brand">
          <span className="admin-header-logo">BB</span>
          <div>
            <h1 className="admin-header-title">Admin Panel</h1>
            <p className="admin-header-sub">Banke Bihari Maheshwar</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="admin-btn admin-btn--ghost" onClick={handleRefresh}>↻ Refresh</button>
          <button className="admin-btn admin-btn--outline" onClick={onLogout}>Sign Out</button>
        </div>
      </header>

      <StatsBar stats={stats} />

      {/* View toggle */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', background: '#fff', padding: '0 24px' }}>
        {[['submissions', 'Submissions'], ['persons', 'Persons']].map(([view, label]) => (
          <button key={view} onClick={() => setActiveView(view)}
            style={{
              padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: activeView === view ? 700 : 400,
              color: activeView === view ? '#3b82f6' : '#6b7280',
              borderBottom: activeView === view ? '2px solid #3b82f6' : '2px solid transparent',
              fontSize: '14px',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Submission type tabs */}
      {activeView === 'submissions' && (
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', padding: '0 24px', overflowX: 'auto' }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? '#3b82f6' : '#6b7280',
                borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                fontSize: '13px', whiteSpace: 'nowrap', textTransform: 'capitalize',
              }}>
              {tab === 'all' ? 'All' : TYPE_LABELS[tab]}
            </button>
          ))}
        </div>
      )}

      <main className="admin-main">
        {error && (
          <div style={{ padding: '12px 16px', marginBottom: '16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>Loading…</div>
        ) : activeView === 'submissions' ? (
          submissions.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon"><UIcon name="fi-sr-inbox" size="3rem" color="var(--color-neutral-400, #9ca3af)" /></div>
              <p className="admin-empty-text">No submissions yet.</p>
              <p className="admin-empty-sub">Form submissions from the website will appear here.</p>
            </div>
          ) : (
            <div className="enquiry-list">
              {submissions.map((item, i) => (
                <SubmissionRow key={`${item.PK}-${item.SK}-${i}`} item={item} token={token} onRefresh={handleRefresh} />
              ))}
            </div>
          )
        ) : (
          persons.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon"><UIcon name="fi-sr-users" size="3rem" color="var(--color-neutral-400, #9ca3af)" /></div>
              <p className="admin-empty-text">No persons yet.</p>
              <p className="admin-empty-sub">People who submit forms will appear here grouped by their contact info.</p>
            </div>
          ) : (
            <div>
              {persons.map((person) => (
                <PersonCard key={person.PK} person={person} token={token} />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');

  const handleLogin = (t) => setToken(t);

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}

export default AdminPage;
