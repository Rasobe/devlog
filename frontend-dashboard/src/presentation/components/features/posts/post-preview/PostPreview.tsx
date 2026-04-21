"use client";

import { useParams } from "next/navigation";
import { usePostPreview } from "./usePostPreview";
import { ErrorState, FetchState } from "@/presentation/components/global";

export const PostPreview = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { post, isLoading, isError } = usePostPreview({ slug });

  if (isLoading) {
    return <FetchState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return <>{JSON.stringify(post)}</>;
};
