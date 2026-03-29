import { AuthRepositoryImpl } from "./repositories/auth.repository.impl";
import { LoginUseCase } from "@/application/use-cases/auth/login.useCase";

export const authRepository = new AuthRepositoryImpl();
export const loginUseCase = new LoginUseCase(authRepository);
