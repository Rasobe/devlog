import { loginMutation } from "@/services/api/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";
import { authStorage, StoredUser } from "@/features/auth/services/auth-storage";
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = authStorage.getToken();

      if (token) {
        setIsAuthenticated(true);
      }
      setIsInitializing(false);
    }, 0);

    return () => clearTimeout(timeout);
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
      // User is kept in storage as fallback/cache if needed by other providers
      authStorage.setUser(loggedUser);

      // 3. Update React state
      setIsAuthenticated(true);
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      // The open-api generated client is safe since login doesn't require a Bearer token
      return loginMut.mutateAsync({
        body: { email, password },
      });
    },
    [loginMut],
  );

  const logout = useCallback(() => {
    authStorage.clear();
    setIsAuthenticated(false);
    apiClient.interceptors.request.clear();
    queryClient.clear();
  }, [queryClient]);

  return {
    isInitializing,
    isLoading: loginMut.isPending,
    error: loginMut.error ? loginMut.error : null,
    isAuthenticated,
    login,
    logout,
  };
}
