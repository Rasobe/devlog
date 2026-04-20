"use client";

import { createContext, useContext, ReactNode } from "react";
import { FullScreenLoader } from "@/presentation/components/global";
import { useAuth } from "@/presentation/hooks/useAuth";
import { StoredUser } from "@/infrastructure/services/auth-storage";
import { AuthResult } from "@/domain/models/auth.model";

interface AuthContextType {
  isInitializing: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: StoredUser | null;
  error: Error | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Componente Provider que envuelve la app
export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const auth = useAuth();

  if (auth.isInitializing) {
    return <FullScreenLoader />;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook para consumir el context — lanza error si se usa fuera del Provider
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
