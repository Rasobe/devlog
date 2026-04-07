import { Post } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useDashboardPostsTable = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  return {
    posts,
    isLoading,
    error,
  };
};
