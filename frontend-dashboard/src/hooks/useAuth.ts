import { loginMutation } from "@/client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { apiClient, setAuthToken } from "@/lib/api-client";
import { authStorage, StoredUser } from "@/lib/auth";
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const storedUser = authStorage.getUser();
    const token = authStorage.getToken();

    if (storedUser && token) {
      setUser(storedUser);
      setAuthToken(token);
    }
    setIsInitializing(false);
  }, []);

  const loginMut = useMutation({
    ...loginMutation(),
    onSuccess: (data) => {
      // 1. Save token and user in local storage
      authStorage.setToken(data.token);

      const loggedUser: StoredUser = {
        email: data.email,
        displayName: data.displayName,
      };
      authStorage.setUser(loggedUser);

      // 2. Set token in API Client interceptor
      setAuthToken(data.token);

      // 3. Update React state
      setUser(loggedUser);
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      // We pass the client instance to the mutation so it knows where to route
      return loginMut.mutateAsync({
        client: apiClient,
        body: { email, password },
      });
    },
    [loginMut],
  );

  const logout = useCallback(() => {
    authStorage.clear();
    setUser(null);
    apiClient.interceptors.request.clear();
  }, []);

  return {
    user,
    isInitializing,
    isLoading: loginMut.isPending,
    error: loginMut.error ? loginMut.error || "Invalid credentials" : null,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
