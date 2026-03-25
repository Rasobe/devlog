import { IAuthRepository } from "../../domain/repositories/auth.repository";
import type { LoginResponse } from "@/services/api/types.gen";
import { authStorage, StoredUser } from "@/features/auth/services/auth-storage";

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    // 1. Llamar al repositorio (Infraestructura de red)
    const data = await this.authRepository.login(email, password);

    // 2. Gestionar los efectos secundarios de la sesión
    authStorage.setToken(data.token);

    const loggedUser: StoredUser = {
      email: data.email,
      displayName: data.displayName,
    };
    authStorage.setUser(loggedUser);

    // 3. Devolver el resultado para la capa de presentación
    return data;
  }
}
