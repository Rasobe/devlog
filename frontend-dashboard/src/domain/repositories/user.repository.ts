import { UserMonthlyActivity, UserStats } from "../models";

export interface IUserRepository {
  getStats(): Promise<UserStats>;
  getActivity(period: number): Promise<UserMonthlyActivity[]>;
}
