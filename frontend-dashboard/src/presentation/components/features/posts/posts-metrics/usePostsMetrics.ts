import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const usePostsMetrics = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  const total = posts?.length ?? 0;
  const published = posts?.filter((post) => post.published).length ?? 0;
  const drafts = posts?.filter((post) => !post.published).length ?? 0;
  const totalViews =
    posts?.reduce((acc, post) => acc + (post.views || 0), 0) ?? 0;

  return {
    total,
    published,
    drafts,
    totalViews,
    isLoading,
    error,
  };
};
