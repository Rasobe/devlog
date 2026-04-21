import { Post } from "@/domain/models/post.model";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostPreviewContentProps {
  post: Post;
}

export const PostPreviewContent = ({ post }: PostPreviewContentProps) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </div>
  );
};
