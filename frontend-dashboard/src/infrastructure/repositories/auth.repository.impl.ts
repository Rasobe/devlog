import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { AuthResult } from "@/domain/models/auth.model";
import { getMe, login } from "@/infrastructure/api/sdk.gen";
import { AuthMapper } from "../mappers/auth.mapper";
import { authStorage } from "../services/auth-storage";

export class AuthRepositoryImpl implements IAuthRepository {
  async getCurrentUser(): Promise<AuthResult> {
    const token = authStorage.getToken();
    const { data, error } = await getMe({
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error(
        "Error inesperado: no hay datos en la respuesta del login",
      );
    }

    return AuthMapper.toDomainMe(data);
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await login({
      body: { email, password },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error(
        "Error inesperado: no hay datos en la respuesta del login",
      );
    }

    return AuthMapper.toDomain(data);
  }
}
