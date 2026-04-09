import { PagedResult } from "@/domain/models/paged-result.model";
import { Post, PostStatus } from "@/domain/models/post.model";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const usePostsContent = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PostStatus>("ALL");

  const { data, isLoading, error } = useQuery<PagedResult<Post>>({
    queryKey: ["posts", page, search, status],
    queryFn: () => getPostsUseCase.execute(page, 10, search || undefined, status),
  });

  return {
    posts: data?.content ?? [],
    totalPages: data?.totalPages ?? 0,
    currentPage: data?.currentPage ?? 0,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    isLoading,
    error,
  };
};
