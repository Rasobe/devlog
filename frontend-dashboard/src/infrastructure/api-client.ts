import axios from "axios";
import { authStorage } from "@/infrastructure/services/auth-storage";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para CADA petición
apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para errores globales (401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clear();
      globalThis.location.href = "/login"; // Redirección forzosa si el token expira
    }
    return Promise.reject(error);
  },
);
