import { PostForm } from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva publicación",
};

const NewPostPage = () => {
  return <PostForm />;
};

export default NewPostPage;
