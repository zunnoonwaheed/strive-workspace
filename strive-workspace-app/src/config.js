// API Configuration
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').trim();

// Remove '/api' suffix if present in env variable and add it explicitly
const baseUrl = API_URL.replace(/\/api$/, '');
export const API_BASE_URL = baseUrl;
export const API_ENDPOINTS = {
  conversations: `${baseUrl}/api/conversations`,
  sessions: `${baseUrl}/api/sessions`,
  stats: `${baseUrl}/api/stats`,
  adminLogin: `${baseUrl}/api/admin/login`,
  adminUsers: `${baseUrl}/api/admin/users`,
  chatbot: `${baseUrl}/api/chatbot`,
};
