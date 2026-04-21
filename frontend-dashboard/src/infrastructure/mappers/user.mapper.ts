import { UserStats } from "@/domain/models/user.model";
import { UserStatsResponse } from "../types";

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
};
