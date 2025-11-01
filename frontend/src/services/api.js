import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat/', {
      message: message,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;

