"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { LoginResponse, LoginError } from "@/infrastructure/api/types.gen";
import { FullScreenLoader } from "@/presentation/components/global";

// Define qué expone el context
interface AuthContextType {
  isInitializing: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: LoginError | Error | string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Crea el context con valor por defecto null
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
