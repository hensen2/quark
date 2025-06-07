import axios from 'axios';

export const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  adapter: 'fetch',
};

export const api = axios.create(axiosConfig);

export const useInterceptRequest = (token: string) => {
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const useInterceptResponse = (): void => {
  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => Promise.reject(error),
  );
};

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => Promise.reject(err),
);
