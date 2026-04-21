import { PagedResult } from "@/domain/models/paged-result.model";
import { Post, PostStatus } from "@/domain/models/post.model";
import { queryKeys } from "@/infrastructure";
import {
  deletePostUseCase,
  getPostsUseCase,
} from "@/infrastructure/dependencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const usePostsContent = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PostStatus>("ALL");
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: (slug: string) => deletePostUseCase.execute(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all() });
      setPostToDelete(null);
      toast.success("Publicación eliminada correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar la publicación");
    },
  });

  const { data, isLoading, error } = useQuery<PagedResult<Post>>({
    queryKey: queryKeys.posts.allPaginated(page, search, status),
    queryFn: () =>
      getPostsUseCase.execute(page, 10, search || undefined, status),
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
    posts: data?.content ?? [],
    totalPages: data?.totalPages ?? 0,
    currentPage: data?.currentPage ?? 0,
    search,
    status,
    isLoading,
    postToDelete,
    error,
    setPage,
    setSearch,
    setStatus,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseClick,
  };
};
