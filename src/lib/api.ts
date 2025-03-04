import axios, { type AxiosError } from 'axios';
const API_BASE_URL = 'https://api.example.com';
import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  adapter: 'fetch',
});

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => Promise.reject(err),
);
