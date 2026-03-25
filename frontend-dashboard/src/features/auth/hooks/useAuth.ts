import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";
import { authStorage } from "@/features/auth/services/auth-storage";
import { useEffect, useState, useCallback } from "react";
import { loginUseCase } from "../infrastructure/dependencies";

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
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Usar la capa de aplicación (Caso de Uso) en lugar de llamar a la API directamente
      return await loginUseCase.execute(email, password);
    },
    onSuccess: () => {
      // El UseCase ya guardó el token y el user en el storage
      // Solamente actualizamos el estado de React
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
