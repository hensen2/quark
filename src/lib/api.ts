import axios from 'axios';
const API_BASE_URL = 'https://api.example.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  adapter: 'fetch',
});

export const useResInterceptors = () => {
  api.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => Promise.reject(err),
  );
};

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => Promise.reject(err),
);
