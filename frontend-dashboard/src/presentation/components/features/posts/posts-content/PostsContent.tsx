"use client";

import {
  PostsTable,
  PostsTableSkeleton,
} from "@/presentation/components/features/posts";
import { usePostsContent } from "./usePostsContent";
import { ErrorState } from "@/presentation/components/global";

export const PostsContent = () => {
  const { posts, isLoading, error } = usePostsContent();

  const renderContent = () => {
    if (isLoading) return <PostsTableSkeleton />;
    if (error) return <ErrorState message="Error al cargar los posts" />;

    return <PostsTable posts={posts || []} />;
  };

  return (
    <div
      key={isLoading ? "loading" : "content"}
      className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {renderContent()}
    </div>
  );
};
