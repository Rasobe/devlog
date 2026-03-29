import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { login } from "@/infrastructure/api/sdk.gen";
import type { LoginResponse } from "@/infrastructure/api/types.gen";

export class AuthRepositoryImpl implements IAuthRepository {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data, error } = await login({
      body: { email, password },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error inesperado: no hay datos en la respuesta del login");
    }

    return data;
  }
}
