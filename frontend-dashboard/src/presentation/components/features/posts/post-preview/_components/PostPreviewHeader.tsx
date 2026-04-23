"use client";

import { formatFullDate } from "@/core/utils";
import { Post } from "@/domain/models/post.model";
import { Badge, Button, Divider } from "@/presentation/components/common";
import { ROUTES } from "@/presentation/config/routes";
import { ChevronLeft, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostPreviewHeaderProps {
  post: Post;
}

export const PostPreviewHeader = ({ post }: PostPreviewHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      {/* Navegación */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ChevronLeft size={16} />
          Volver
        </Button>
        <Button
          variant="gradient"
          onClick={() => router.push(ROUTES.POSTS_EDIT(post.slug))}
        >
          <PencilIcon size={16} />
          Editar
        </Button>
      </div>

      {/* Contenido editorial */}
      <div className="flex flex-col gap-4">
        <Badge variant={post.published ? "success" : "warning"}>
          {post.published ? "Publicado" : "Borrador"}
        </Badge>

        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{post.author.displayName}</span>
          <span>·</span>
          <span>{formatFullDate(post.createdAt)}</span>
          <span>·</span>
          <span>{post.views} visualizaciones</span>
        </div>
      </div>

      <Divider />
    </div>
  );
};
