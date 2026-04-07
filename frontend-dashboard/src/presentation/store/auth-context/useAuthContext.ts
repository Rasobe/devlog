import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authStorage } from "@/infrastructure/services/auth-storage";
import { useState, useCallback } from "react";
import { loginUseCase } from "@/infrastructure/dependencies";
import type { LoginError } from "@/infrastructure/api/types.gen";
import type { AuthResult } from "@/domain/models/auth.model";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/presentation/config/routes";

export function useAuthContext() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!authStorage.getToken(),
  );
  const [isInitializing] = useState<boolean>(false);

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
    queryClient.clear();
    router.push(ROUTES.LOGIN);
  }, [queryClient, router]);

  return {
    isInitializing,
    isLoading: loginMut.isPending,
    error: loginMut.error ?? loginMut.error,
    isAuthenticated,
    login,
    logout,
  };
}
