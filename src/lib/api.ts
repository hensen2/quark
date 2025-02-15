import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost',
});

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => Promise.reject(err),
);
