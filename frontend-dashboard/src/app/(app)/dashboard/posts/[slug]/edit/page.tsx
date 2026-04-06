"use client";

import { useParams } from "next/navigation";
import { PostForm } from "@/presentation/components/features/posts";

const EditPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div>
      {slug ? <PostForm slug={slug} /> : <div>No se encontró la entrada</div>}
    </div>
  );
};

export default EditPostPage;
