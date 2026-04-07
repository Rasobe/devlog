"use client";

import { useParams } from "next/navigation";
import { PostForm } from "../post-form";

export const EditPostContent = () => {
  const params = useParams();
  const slug = params.slug as string;

  return <PostForm mode="edit" slug={slug} />;
};
