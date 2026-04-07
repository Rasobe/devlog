import { Post } from "@/domain/models/post.model";
import { getPostsUseCase, deletePostUseCase } from "@/infrastructure/dependencies";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDashboardPostsTable = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deletePostUseCase.execute(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { 
    posts, 
    isLoading, 
    error,
    deletePost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
