import axios from "axios";

export const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:4000";

export const buildAssetUrl = (assetPath) => {
  if (!assetPath) {
    return null;
  }

  if (/^https?:\/\//.test(assetPath)) {
    return assetPath;
  }

  return `${API_BASE_URL}${assetPath}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

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
