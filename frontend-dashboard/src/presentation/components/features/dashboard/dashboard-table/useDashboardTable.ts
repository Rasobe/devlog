import { Post } from "@/domain/models/post.model";
import { getPostsUseCase, deletePostUseCase } from "@/infrastructure/dependencies";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDashboardTable = () => {
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
    mutationFn: (id: string) => deletePostUseCase.execute(id),
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
