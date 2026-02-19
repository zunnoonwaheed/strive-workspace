import { useState, useEffect, useRef, useCallback } from 'react';
import './AdminPanel.css';
import { API_URL } from '../config';

const LOGOUT_TIMEOUT_MS = 45 * 60 * 1000; // 45 minutes

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionConversations, setSessionConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const logoutTimerRef = useRef(null);

  // ── Persist login across page refresh ──────────────────────────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // ── 45-min inactivity logout ────────────────────────────────────────────────
  const resetLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, LOGOUT_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetLogoutTimer));
    resetLogoutTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetLogoutTimer));
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [isAuthenticated, resetLogoutTimer]);

  // ── Fetch sessions when authenticated ──────────────────────────────────────
  useEffect(() => {
    if (isAuthenticated && token) fetchSessions();
  }, [isAuthenticated, token]);

  const fetchSessions = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionConversations = async (sessionId) => {
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSessionConversations(data.conversations || []);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Login failed. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
    setSessions([]);
    setSelectedSession(null);
    setSessionConversations([]);
    setModalOpen(false);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  const openSession = async (session) => {
    setSelectedSession(session);
    setSessionConversations([]);
    setModalOpen(true);
    await fetchSessionConversations(session.session_id);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
    setSessionConversations([]);
  };

  const downloadCSV = () => {
    const headers = ['#', 'Date', 'Email', 'Phone', 'Messages', 'Session ID'];
    const rows = filtered.map((s, i) => [
      i + 1,
      new Date(s.last_message_at).toLocaleString(),
      s.user_email || '',
      s.user_phone || '',
      s.message_count,
      s.session_id
    ]);
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'strive-inquiries.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadThreadCSV = () => {
    if (!sessionConversations.length) return;
    const headers = ['#', 'Time', 'User Message', 'Bot Response', 'Topic'];
    const rows = sessionConversations.map((c, i) => [
      i + 1,
      new Date(c.created_at).toLocaleString(),
      c.user_message,
      c.bot_response,
      c.intent_topic || ''
    ]);
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `conversation-${selectedSession?.session_id?.slice(0,12)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const q = searchQuery.toLowerCase();
  const filtered = sessions.filter(s =>
    !q ||
    (s.user_email || '').toLowerCase().includes(q) ||
    (s.user_phone || '').toLowerCase().includes(q) ||
    s.session_id.toLowerCase().includes(q)
  );

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="login-logo">S</div>
          <h2>Strive Admin</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                required placeholder="Enter username" autoComplete="username" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="Enter password" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className="btn-login">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main panel ──────────────────────────────────────────────────────────────
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="admin-logo">S</span>
          <h1>Strive Admin Panel</h1>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <div className="admin-body">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <h2>Inquiries <span className="count-badge">{filtered.length}</span></h2>
          </div>
          <div className="toolbar-right">
            <input
              className="search-input"
              type="text"
              placeholder="Search by email or phone…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="btn-refresh" onClick={fetchSessions} title="Refresh">↻</button>
            {filtered.length > 0 && (
              <button className="btn-download" onClick={downloadCSV}>⬇ Download CSV</button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading inquiries…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <p>No inquiries yet. Start chatting with the bot!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date & Time</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Messages</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((session, idx) => (
                  <tr key={session.session_id} onClick={() => openSession(session)} className="session-row">
                    <td className="col-num">{idx + 1}</td>
                    <td className="col-date">
                      <div>{new Date(session.last_message_at).toLocaleDateString()}</div>
                      <div className="time-sub">{new Date(session.last_message_at).toLocaleTimeString()}</div>
                    </td>
                    <td className="col-contact">
                      {session.user_email
                        ? <span className="contact-value">✉ {session.user_email}</span>
                        : <span className="empty-cell">—</span>}
                    </td>
                    <td className="col-contact">
                      {session.user_phone
                        ? <span className="contact-value">📞 {session.user_phone}</span>
                        : <span className="empty-cell">—</span>}
                    </td>
                    <td className="col-count">
                      <span className="msg-badge">{session.message_count}</span>
                    </td>
                    <td className="col-action">
                      <button className="btn-view" onClick={e => { e.stopPropagation(); openSession(session); }}>
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Conversation Modal */}
      {modalOpen && selectedSession && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-meta">
                <h3>Conversation</h3>
                <div className="modal-contact-row">
                  {selectedSession.user_email && <span>✉ {selectedSession.user_email}</span>}
                  {selectedSession.user_phone && <span>📞 {selectedSession.user_phone}</span>}
                  <span className="msg-count-label">{selectedSession.message_count} messages</span>
                </div>
              </div>
              <div className="modal-actions-row">
                {sessionConversations.length > 0 && (
                  <button className="btn-download-sm" onClick={downloadThreadCSV}>⬇ CSV</button>
                )}
                <button className="btn-close" onClick={closeModal}>✕</button>
              </div>
            </div>

            <div className="modal-body">
              {sessionConversations.length === 0 ? (
                <div className="loading-state"><div className="spinner" /><p>Loading…</p></div>
              ) : (
                sessionConversations.map((conv, i) => (
                  <div key={conv.id} className="conv-turn">
                    <div className="bubble-row user-row">
                      <div className="bubble user-bubble">
                        <span className="bubble-label">User</span>
                        <p>{conv.user_message}</p>
                        <span className="bubble-time">{new Date(conv.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="bubble-row bot-row">
                      <div className="bubble bot-bubble">
                        <span className="bubble-label">Bot {conv.intent_topic && <em>· {conv.intent_topic}</em>}</span>
                        <p>{conv.bot_response}</p>
                        <span className="bubble-time">{new Date(conv.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
