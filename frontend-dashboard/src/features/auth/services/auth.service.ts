import { login } from "@/infrastructure/api/sdk.gen";
import type { LoginResponse } from "@/infrastructure/api/types.gen";
import { authStorage, StoredUser } from "@/infrastructure/services/auth-storage";

export const AuthService = {
  /**
   * Realiza la autenticación con el backend y guarda la sesión localmente.
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // 1. Llamada a la API (Capa de Red/Repositorio)
    const { data, error } = await login({
      body: { email, password },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error inesperado: no hay datos en la respuesta del login");
    }

    // 2. Efecto Secundario Exitoso: Manejar la sesión (Caso de Uso Puro)
    authStorage.setToken(data.token);

    const loggedUser: StoredUser = {
      email: data.email,
      displayName: data.displayName,
    };
    authStorage.setUser(loggedUser);

    return data;
  },

  /**
   * Destruye la sesión del cliente de manera segura y forzada.
   */
  logout: () => {
    authStorage.clear();
  }
};
