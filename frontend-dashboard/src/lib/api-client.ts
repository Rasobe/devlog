import { createClient } from "@/client/client";

export const apiClient = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
});

export function setAuthToken(token: string) {
  apiClient.interceptors.request.use((request) => {
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  });
}
