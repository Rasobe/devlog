import { IUserRepository } from "@/domain/repositories/user.repository";

export class GetUserStatsUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute() {
    return this.repository.getUserStats();
  }
}
