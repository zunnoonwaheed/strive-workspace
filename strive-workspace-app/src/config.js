// API Configuration
// In production (Vercel), use relative URLs. In development, use localhost
const isProduction = window.location.hostname !== 'localhost';
const productionBaseUrl = window.location.origin; // https://strive-workspace-app.vercel.app
const developmentBaseUrl = 'http://localhost:3001';

export const API_URL = isProduction
  ? productionBaseUrl
  : (import.meta.env.VITE_API_URL || developmentBaseUrl);

export const API_BASE_URL = API_URL;
export const API_ENDPOINTS = {
  conversations: `${API_URL}/api/conversations`,
  sessions: `${API_URL}/api/sessions`,
  stats: `${API_URL}/api/stats`,
  adminLogin: `${API_URL}/api/admin/login`,
  adminUsers: `${API_URL}/api/admin/users`,
  chatbot: `${API_URL}/api/chatbot`,
};
