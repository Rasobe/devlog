import { PostForm } from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva publicación",
};

export default function NewPostPage() {
  return <PostForm />;
}
