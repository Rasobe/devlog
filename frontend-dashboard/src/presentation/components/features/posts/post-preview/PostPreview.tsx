"use client";

import { useParams } from "next/navigation";
import { usePostPreview } from "./usePostPreview";
import { ErrorState, FetchState } from "@/presentation/components/common";
import { PostPreviewHeader, PostPreviewContent } from "./_components";

export const PostPreview = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { post, isLoading, isError } = usePostPreview({ slug });

  if (isLoading) {
    return <FetchState />;
  }

  if (isError || !post) {
    return <ErrorState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PostPreviewHeader post={post} />
      <PostPreviewContent post={post} />
    </div>
  );
};
