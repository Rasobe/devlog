import { UserStats } from "@/domain/models/user.model";
import { getUserStatsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const usePostsMetrics = () => {
  const { data, isLoading, error } = useQuery<UserStats>({
    queryKey: ["user-stats"],
    queryFn: () => getUserStatsUseCase.execute(),
  });

  const { totalPublishedPosts, totalDraftPosts, totalViews } = data || {};

  const totalPosts = (totalPublishedPosts || 0) + (totalDraftPosts || 0);

  return {
    totalPosts,
    totalPublishedPosts,
    totalDraftPosts,
    totalViews,
    isLoading,
    error,
  };
};
