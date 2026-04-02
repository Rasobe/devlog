import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/infrastructure/api-client";
import { authStorage } from "@/infrastructure/services/auth-storage";
import { useEffect, useState, useCallback } from "react";
import { loginUseCase } from "@/infrastructure/dependencies";
import type { LoginError } from "@/infrastructure/api/types.gen";
import type { AuthResult } from "@/domain/models/auth.model";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
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

  const loginMut = useMutation<
    AuthResult,
    LoginError | Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      return await loginUseCase.execute(email, password);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      return loginMut.mutateAsync({ email, password });
    },
    [loginMut],
  );

  const logout = useCallback(() => {
    authStorage.clear();
    setIsAuthenticated(false);
    apiClient.interceptors.request.clear();
    queryClient.clear();
    router.push("/login");
  }, [queryClient]);

  return {
    isInitializing,
    isLoading: loginMut.isPending,
    error: loginMut.error ?? loginMut.error,
    isAuthenticated,
    login,
    logout,
  };
}
