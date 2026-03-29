import { AuthResult } from "@/domain/models/auth.model";

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthResult>;
}
