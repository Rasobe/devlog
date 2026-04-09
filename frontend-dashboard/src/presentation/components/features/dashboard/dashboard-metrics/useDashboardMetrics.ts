import { PagedResult } from "@/domain/models/paged-result.model";
import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useDashboardMetrics = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery<PagedResult<Post>>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  const posts = data?.content ?? [];

  const published = posts.filter((post) => post.published).length;
  const drafts = posts.filter((post) => !post.published).length;
  const totalViews = posts.reduce((acc, post) => acc + (post.views || 0), 0);

  return { published, drafts, totalViews, isLoading, error };
};
