import { AuthRepositoryImpl } from "./repositories/auth.repository.impl";
import { LoginUseCase } from "../application/use-cases/login.useCase";

/**
 * Contenedor de Inyección de Dependencias básico.
 * Instanciamos el repositorio concreto y lo inyectamos en el caso de uso.
 */

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);
