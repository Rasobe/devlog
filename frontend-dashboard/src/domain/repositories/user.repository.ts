import { UserStats } from "../models/user.model";

export interface IUserRepository {
  getStats(): Promise<UserStats>;
}
