"use client";

import { useParams } from "next/navigation";
import { PostForm } from "@/presentation/components/features/posts";

const EditPostPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      {id ? <PostForm mode="edit" id={id} /> : <div>No se encontró la entrada</div>}
    </div>
  );
};

export default EditPostPage;
