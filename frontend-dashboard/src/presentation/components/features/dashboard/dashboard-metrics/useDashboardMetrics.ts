import { UserStats } from "@/domain/models/user.model";
import { getUserStatsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useDashboardMetrics = () => {
  const { data, isLoading, error } = useQuery<UserStats>({
    queryKey: ["user-stats"],
    queryFn: () => getUserStatsUseCase.execute(),
  });

  const { totalPublishedPosts, totalDraftPosts, totalViews } = data || {};

  return { totalPublishedPosts, totalDraftPosts, totalViews, isLoading, error };
};
