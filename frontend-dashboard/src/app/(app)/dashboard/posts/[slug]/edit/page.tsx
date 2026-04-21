import { PostEditContent } from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar publicación",
};

const EditPostPage = () => {
  return <PostEditContent />;
};

export default EditPostPage;
