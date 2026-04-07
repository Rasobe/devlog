"use client";

import {
  PostsTableSkeleton,
  PostsTable,
} from "@/presentation/components/features/posts";
import { useDashboardPostsTable } from "./useDashboardPostsTable";

export const DashboardPostsTable = () => {
  const { posts, isLoading, error } = useDashboardPostsTable();

  const renderContent = () => {
    if (isLoading) return <PostsTableSkeleton />;
    if (error) return <p className="text-red-500">Error loading posts</p>;
    
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
