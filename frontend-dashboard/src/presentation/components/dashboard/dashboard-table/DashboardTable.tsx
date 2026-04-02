"use client";

import Link from "next/link";
import { Button } from "../../ui/Button";
import { useDashboardTable } from "./useDashboardTable";
import PostCard from "../../posts/post-card/PostCard";
import PostsTable from "../../posts/posts-table/PostsTable";
import PostsTableSkeleton from "../../posts/posts-table/PostsTableSkeleton";
import { ROUTES } from "@/presentation/config/routes";

const DashboardTable = () => {
  const { posts, isLoading, error } = useDashboardTable();

  const renderContent = () => {
    if (isLoading) return <PostsTableSkeleton />;
    if (error) return <p className="text-red-500">Error loading posts</p>;
    return <PostsTable posts={posts || []} onDelete={() => {}} />;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your posts</p>
        </div>
        <Link href={ROUTES.POSTS_NEW}>
          <Button variant="primary">Create Post</Button>
        </Link>
      </div>

      {renderContent()}
    </div>
  );
};

export default DashboardTable;
