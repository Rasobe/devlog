import { Post } from "@/domain/models/post.model";

interface PostPreviewContentProps {
  post: Post;
}

export const PostPreviewContent = ({ post }: PostPreviewContentProps) => {
  return <div>PostPreviewContent</div>;
};
