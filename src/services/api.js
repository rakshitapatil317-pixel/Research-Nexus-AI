import axios from 'axios';

// Creating Axios Instance with a base URL matching our backend paths.
// In local dev, Vite proxy redirects this to http://localhost/research-nexus-ai/backend
const api = axios.create({
  baseURL: '/backend/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login.php', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register.php', { name, email, password });
    return response.data;
  },
};

export const paperService = {
  upload: async (userId, title, author, pdfFile) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('pdf', pdfFile);

    const response = await api.post('/papers/upload.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/papers/getAll.php');
    return response.data;
  },

  generateSummary: async (text) => {
    const response = await api.post('/papers/generateSummary.php', { text });
    return response.data;
  },
};

export default api;
