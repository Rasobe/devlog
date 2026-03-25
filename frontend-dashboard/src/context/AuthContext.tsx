"use client";

import { createContext, useContext, ReactNode } from "react";
import { StoredUser } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

// Define qué expone el context
interface AuthContextType {
  user: StoredUser | null;
  isInitializing: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
  login: (email: string, password: string) => Promise<any>;
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
