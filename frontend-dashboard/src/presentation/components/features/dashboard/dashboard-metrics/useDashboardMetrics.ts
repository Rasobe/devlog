import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useDashboardMetrics = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  const published = posts?.filter((post) => post.published).length;
  const drafts = posts?.filter((post) => !post.published).length;

  return { published, drafts, isLoading, error };
};
