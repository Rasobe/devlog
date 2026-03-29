import type { LoginResponse } from "@/infrastructure/api/types.gen";

export interface IAuthRepository {
  login(email: string, password: string): Promise<LoginResponse>;
}
