import { Post } from "@/domain/models/post.model";
import { ROUTES } from "@/presentation/config/routes";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="p-6 bg-background border border-border rounded-lg hover:border-foreground/30 transition-colors">
      <a href={ROUTES.POSTS_VIEW(post.slug)} className="flex flex-col gap-2">
        <time
          dateTime={post.createdAt.toISOString()}
          className="text-sm text-muted-foreground"
        >
          {formattedDate}
        </time>
        <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {post.excerpt}
        </p>
        <span className="text-sm text-muted-foreground mt-1">Leer más →</span>
      </a>
    </article>
  );
};

export default PostCard;
