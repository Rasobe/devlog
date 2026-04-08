import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useRecentPosts = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  const limitedPosts = posts?.slice(0, 5) ?? [];

  return {
    posts: limitedPosts,
    isLoading,
    error,
  };
};
