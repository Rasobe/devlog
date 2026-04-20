import { PagedResult } from "@/domain/models/paged-result.model";
import { Post } from "@/domain/models/post.model";
import {
  deletePostUseCase,
  getPostsUseCase,
} from "@/infrastructure/dependencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useRecentPosts = () => {
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: (slug: string) => deletePostUseCase.execute(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostToDelete(null);
      toast.success("Publicación eliminada correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar la publicación");
    },
  });

  const { data, error } = useQuery<PagedResult<Post>>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(0, 5),
  });

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      await deletePostMutation.mutateAsync(postToDelete.slug);
    }
  };

  const handleCloseClick = () => {
    setPostToDelete(null);
  };

  return {
    posts: data?.content,
    error,
    postToDelete,
    isLoading: deletePostMutation.isPending,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseClick,
  };
};
