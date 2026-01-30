const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/$/, '')}/api`;
export default API_URL;
