import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { AuthResult } from "@/domain/models/auth.model";

export class GetCurrentUserUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  async execute(): Promise<AuthResult> {
    return await this.repository.getCurrentUser();
  }
}
