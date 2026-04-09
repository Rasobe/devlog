import { PagedResult } from "@/domain/models/paged-result.model";
import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useRecentPosts = () => {
  const { data, isLoading, error } = useQuery<PagedResult<Post>>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(0, 5),
  });

  const posts = data?.content ?? [];

  return {
    posts,
    isLoading,
    error,
  };
};
