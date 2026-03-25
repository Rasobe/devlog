import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { login } from "@/services/api/sdk.gen";
import type { LoginResponse } from "@/services/api/types.gen";

export class AuthRepositoryImpl implements IAuthRepository {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data, error } = await login({
      body: { email, password },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error inesperado: no hay datos en la respuesta de login");
    }

    return data;
  }
}
