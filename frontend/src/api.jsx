import axios from "axios";

const rawApiUrl =
  import.meta.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000";

const API_URL = rawApiUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
});

export const buildApiUrl = (path = "") => {
  if (!path) return API_URL;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

// Allow FormData requests to set their own Content-Type (including multipart boundary)
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (config.headers && typeof config.headers.delete === "function") {
      config.headers.delete("Content-Type");
    } else if (config.headers) {
      delete config.headers["Content-Type"];
    }
  }
  return config;
});

export default api;
