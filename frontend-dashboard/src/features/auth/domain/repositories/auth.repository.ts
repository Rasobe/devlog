import type { LoginResponse } from "@/services/api/types.gen";

export interface IAuthRepository {
  /**
   * Realiza la autenticación con el servidor y devuelve la respuesta.
   */
  login(email: string, password: string): Promise<LoginResponse>;
}
