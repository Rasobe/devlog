import { UserMonthlyActivity, UserStats } from "@/domain/models/user.model";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { authStorage } from "../services/auth-storage";
import { getActivity, getMyStats } from "../api";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepositoryImpl implements IUserRepository {
  async getActivity(period: number): Promise<UserMonthlyActivity[]> {
    const { data, error } = await getActivity({
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
      path: {
        period,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al obtener la actividad del usuario");
    }

    return UserMapper.toDomainActivities(data);
  }

  async getStats(): Promise<UserStats> {
    const { data, error } = await getMyStats({
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al obtener las estadísticas del usuario");
    }

    return UserMapper.toDomainStats(data);
  }
}
