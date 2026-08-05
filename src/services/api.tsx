import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL:'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (typeof window === 'undefined') {
    return config;
  }
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;