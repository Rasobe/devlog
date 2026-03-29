import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { AuthResult } from "@/domain/models/auth.model";
import { login } from "@/infrastructure/api/sdk.gen";
import { AuthMapper } from "../mappers/auth.mapper";

export class AuthRepositoryImpl implements IAuthRepository {
  async login(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await login({
      body: { email, password },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error inesperado: no hay datos en la respuesta del login");
    }

    return AuthMapper.toDomain(data);
  }
}
