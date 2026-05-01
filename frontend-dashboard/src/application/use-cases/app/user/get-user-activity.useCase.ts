import { UserMonthlyActivity } from "@/domain/models";
import { IUserRepository } from "@/domain/repositories";

export class GetUserActivityUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(period: number): Promise<UserMonthlyActivity[]> {
    return this.repository.getActivity(period);
  }
}
