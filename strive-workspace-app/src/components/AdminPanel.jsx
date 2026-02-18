import { useState, useEffect } from 'react';
import './AdminPanel.css';

const API_URL = 'http://localhost:3001/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [conversations, setConversations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('conversations');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await Promise.all([
        fetchConversations(),
        fetchSessions(),
        fetchStats()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword
        })
      });
      const data = await response.json();
      if (response.ok) {
        setShowAddUserModal(false);
        setNewUsername('');
        setNewPassword('');
        fetchUsers();
        alert('User added successfully');
      } else {
        alert(data.error || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchUsers();
        alert('User deleted successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `${API_URL}/conversations?page=${currentPage}&limit=50${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      setConversations(data.conversations || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_URL}/sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchSessionConversations = async (sessionId) => {
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching session conversations:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setConversations([]);
    setSessions([]);
    setStats(null);
  };

  const handleSessionClick = (sessionId) => {
    setSelectedSession(sessionId);
    fetchSessionConversations(sessionId);
    setActiveTab('conversations');
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'conversations') {
      fetchConversations();
    }
  }, [currentPage, searchQuery, isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="admin123"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-login">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="login-hint">Default: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🤖 Chatbot Admin Panel</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === 'conversations' ? 'active' : ''}
          onClick={() => { setActiveTab('conversations'); setSelectedSession(null); fetchConversations(); }}
        >
          All Conversations
        </button>
        <button
          className={activeTab === 'sessions' ? 'active' : ''}
          onClick={() => { setActiveTab('sessions'); fetchSessions(); }}
        >
          Sessions
        </button>
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => { setActiveTab('stats'); fetchStats(); }}
        >
          Statistics
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => { setActiveTab('users'); fetchUsers(); }}
        >
          Users
        </button>
      </div>

      {stats && activeTab === 'stats' && (
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Conversations</h3>
            <p className="stat-number">{stats.totalConversations}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sessions</h3>
            <p className="stat-number">{stats.totalSessions}</p>
          </div>
          <div className="stat-card">
            <h3>Conversations Today</h3>
            <p className="stat-number">{stats.conversationsToday}</p>
          </div>
          <div className="stat-card">
            <h3>Unique Users</h3>
            <p className="stat-number">{stats.uniqueUsers}</p>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="admin-sessions">
          <h2>Chat Sessions</h2>
          <div className="sessions-list">
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`session-card ${selectedSession === session.session_id ? 'selected' : ''}`}
                onClick={() => handleSessionClick(session.session_id)}
              >
                <div className="session-header">
                  <strong>Session ID:</strong> {session.session_id.substring(0, 20)}...
                </div>
                <div className="session-info">
                  {session.user_email && <div>📧 {session.user_email}</div>}
                  {session.user_phone && <div>📞 {session.user_phone}</div>}
                  <div>💬 {session.message_count} messages</div>
                  <div>🕒 {new Date(session.last_message_at).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'conversations' && (
        <div className="admin-conversations">
          {selectedSession ? (
            /* Session detail view: chat-style thread */
            <>
              <div className="session-detail-header">
                <button onClick={() => { setSelectedSession(null); fetchConversations(); }} className="btn-back">
                  ← Back to Sessions
                </button>
                <div className="session-detail-meta">
                  {(() => {
                    const session = sessions.find(s => s.session_id === selectedSession);
                    return session ? (
                      <>
                        <div className="session-detail-id">Session: {session.session_id}</div>
                        <div className="session-detail-info">
                          {session.user_email && <span>📧 {session.user_email}</span>}
                          {session.user_phone && <span>📞 {session.user_phone}</span>}
                          <span>💬 {session.message_count} messages</span>
                          <span>🕒 {new Date(session.last_message_at).toLocaleString()}</span>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="no-data">No messages in this session</div>
              ) : (
                <div className="session-thread">
                  {conversations.map((conv) => (
                    <div key={conv.id} className="session-turn">
                      <div className="thread-row thread-user">
                        <div className="thread-bubble user-bubble">
                          <span className="thread-label">User</span>
                          <p>{conv.user_message}</p>
                          <span className="thread-time">{new Date(conv.created_at).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="thread-row thread-bot">
                        <div className="thread-bubble bot-bubble">
                          <span className="thread-label">Bot</span>
                          <p>{conv.bot_response}</p>
                          {conv.intent_topic && (
                            <span className="thread-intent">Intent: {conv.intent_topic}</span>
                          )}
                          <span className="thread-time">{new Date(conv.created_at).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* All conversations list */
            <>
              <div className="conversations-header">
                <h2>All Conversations</h2>
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="no-data">No conversations found</div>
              ) : (
                <>
                  <div className="conversations-list">
                    {conversations.map((conv) => (
                      <div key={conv.id} className="conversation-item">
                        <div className="conversation-header">
                          <span className="session-id">Session: {conv.session_id.substring(0, 15)}...</span>
                          <span className="timestamp">{new Date(conv.created_at).toLocaleString()}</span>
                        </div>
                        <div className="conversation-content">
                          <div className="user-message">
                            <strong>User:</strong> {conv.user_message}
                          </div>
                          <div className="bot-response">
                            <strong>Bot:</strong> {conv.bot_response}
                          </div>
                          {(conv.user_email || conv.user_phone) && (
                            <div className="contact-info">
                              {conv.user_email && <span>📧 {conv.user_email}</span>}
                              {conv.user_phone && <span>📞 {conv.user_phone}</span>}
                            </div>
                          )}
                          {conv.intent_topic && (
                            <div className="intent-topic">
                              <strong>Intent:</strong> {conv.intent_topic}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {pagination && pagination.totalPages > 1 && (
                    <div className="pagination">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {pagination.page} of {pagination.totalPages}</span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                        disabled={currentPage === pagination.totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-users">
          <div className="users-header">
            <h2>Admin Users</h2>
            <button onClick={() => setShowAddUserModal(true)} className="btn-add-user">
              + Add New User
            </button>
          </div>

          {showAddUserModal && (
            <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Add New User</h3>
                <form onSubmit={handleAddUser}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="btn-primary">Add User</button>
                    <button type="button" onClick={() => setShowAddUserModal(false)} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <div className="user-username">
                    <strong>{user.username}</strong>
                    {user.username === 'admin' && <span className="admin-badge">Admin</span>}
                  </div>
                  <div className="user-meta">
                    Created: {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
                {user.username !== 'admin' && (
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
