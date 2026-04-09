"use client";

import { PostStatus } from "@/domain/models/post.model";
import {
  PostsTable,
  PostsTableSkeleton,
} from "@/presentation/components/features/posts";
import { usePostsContent } from "./usePostsContent";
import {
  ErrorState,
  Select,
  TextField,
} from "@/presentation/components/global";
import { Search } from "lucide-react";

export const PostsContent = () => {
  const {
    posts,
    isLoading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    totalPages,
    currentPage,
  } = usePostsContent();

  const renderContent = () => {
    if (isLoading) return <PostsTableSkeleton />;
    if (error)
      return (
        <ErrorState
          message="Error al cargar los posts"
          showBackButton={false}
        />
      );

    return <PostsTable posts={posts || []} />;
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Buscador y filtros — siempre visibles */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título..."
            className="pl-10"
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          options={[
            { value: "ALL", label: "Todos" },
            { value: "PUBLISHED", label: "Publicados" },
            { value: "DRAFT", label: "Borradores" },
          ]}
        />
      </div>

      {/* Contenido */}
      {renderContent()}
    </div>
  );
};
