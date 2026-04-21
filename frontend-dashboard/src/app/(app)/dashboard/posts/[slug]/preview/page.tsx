import { PostPreview } from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Previsualizar publicación",
};

const PostPreviewPage = () => {
  return <PostPreview />;
};

export default PostPreviewPage;
