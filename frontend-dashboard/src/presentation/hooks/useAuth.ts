import type { AuthResult, UserRole } from "@/domain/models/auth.model";
import {
  getCurrentUserUseCase,
  loginUseCase,
} from "@/infrastructure/dependencies";
import {
  authStorage,
  type StoredUser,
} from "@/infrastructure/services/auth-storage";
import { ROUTES } from "@/presentation/config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getCurrentUserUseCase.execute();
        const storedUser = authStorage.getUser();
        setIsAuthenticated(true);
        setUser(storedUser);
      } catch {
        authStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  const loginMut = useMutation<
    AuthResult,
    Error,
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
        role: data.role as UserRole,
      });
    },
  });

  const login = async (email: string, password: string) => {
    return loginMut.mutateAsync({ email, password });
  };

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
    error: loginMut.error,
    isAuthenticated,
    user,
    login,
    logout,
  };
}
