import { IAuthRepository } from "@/domain/repositories/auth.repository";
import type { LoginResponse } from "@/infrastructure/api/types.gen";
import { authStorage, StoredUser } from "@/infrastructure/services/auth-storage";

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    const data = await this.authRepository.login(email, password);

    authStorage.setToken(data.token);

    const loggedUser: StoredUser = {
      email: data.email,
      displayName: data.displayName,
    };
    authStorage.setUser(loggedUser);

    return data;
  }
}
