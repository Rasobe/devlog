import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authStorage, type StoredUser } from "@/infrastructure/services/auth-storage";
import { useState, useCallback, useEffect } from "react";
import { loginUseCase } from "@/infrastructure/dependencies";
import type { LoginError } from "@/infrastructure/api/types.gen";
import type { AuthResult } from "@/domain/models/auth.model";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/presentation/config/routes";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    Promise.resolve().then(() => {
      const token = authStorage.getToken();
      const storedUser = authStorage.getUser();
      
      if (token && storedUser) {
        setIsAuthenticated(true);
        setUser(storedUser);
      }
      
      setIsInitializing(false);
    });
  }, []);

  const loginMut = useMutation<
    AuthResult,
    LoginError | Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      return await loginUseCase.execute(email, password);
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser({
        email: data.email,
        displayName: data.displayName,
      });
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
    setUser(null);
    queryClient.clear();
    router.push(ROUTES.LOGIN);
  }, [queryClient, router]);

  return {
    isInitializing,
    isLoading: loginMut.isPending,
    error: loginMut.error ?? loginMut.error,
    isAuthenticated,
    user,
    login,
    logout,
  };
}
