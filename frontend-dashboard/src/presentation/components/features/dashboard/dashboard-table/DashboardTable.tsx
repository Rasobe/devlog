"use client";

import { useDashboardTable } from "./useDashboardTable";
import {
  PostsTableSkeleton,
  PostsTable,
} from "@/presentation/components/features/posts";

export const DashboardTable = () => {
  const { posts, isLoading, error } = useDashboardTable();

  const renderContent = () => {
    if (isLoading) return <PostsTableSkeleton />;
    if (error) return <p className="text-red-500">Error loading posts</p>;
    
    return <PostsTable posts={posts || []} onDelete={() => {}} />;
  };

  return <div className="flex flex-col gap-4">{renderContent()}</div>;
};
