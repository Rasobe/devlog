import { UserMonthlyActivity, UserStats } from "@/domain/models/user.model";
import { UserMonthlyActivitiesResponse, UserStatsResponse } from "../types";

export const UserMapper = {
  /** API → Domain (lo que lees del backend → lo que usas en tu app) */
  toDomainStats(response: UserStatsResponse): UserStats {
    return {
      totalPosts: response.totalPosts,
      totalPublishedPosts: response.totalPublishedPosts,
      totalDraftPosts: response.totalDraftPosts,
      totalViews: response.totalViews,
    };
  },

  toDomainActivities(
    response: UserMonthlyActivitiesResponse,
  ): UserMonthlyActivity[] {
    return response.map((item) => ({
      month: item.month,
      totalPosts: item.count,
    }));
  },
};
