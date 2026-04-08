import { formatShortDate } from "@/core/utils";
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

  const lastPost = [...(posts || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  const lastPostDate = lastPost?.createdAt
    ? formatShortDate(lastPost?.createdAt)
    : "—";

  return { published, drafts, lastPostDate, isLoading, error };
};
