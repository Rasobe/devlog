import { createClient } from "@hey-api/client-axios";
import { authStorage } from "@/infrastructure/services/auth-storage";

export const apiClient = createClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
});

apiClient.instance.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clear();
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
