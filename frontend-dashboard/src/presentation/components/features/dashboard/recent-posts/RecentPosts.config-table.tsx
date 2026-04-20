import { useMemo } from "react";
import { formatShortDate } from "@/core/utils";
import { Post } from "@/domain/models/post.model";
import {
  TableActions,
  TableActionBtn,
  Badge,
} from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";

export interface UseRecentPostsColumnsProps {
  onDeleteClick?: (post: Post) => void;
}

export const useRecentPostsColumns = ({ onDeleteClick }: UseRecentPostsColumnsProps = {}) => {
  return useMemo(() => [
    {
      key: "status",
      header: "Estado",
      render: (post: Post) => (
        <Badge variant={post.published ? "success" : "warning"}>
          {post.published ? "Publicado" : "Borrador"}
        </Badge>
      ),
    },
    {
      key: "title",
      header: "Título",
      render: (post: Post) => (
        <span className="font-medium text-foreground">{post.title}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Creado",
      render: (post: Post) => (
        <span className="text-muted-foreground">
          {formatShortDate(post.createdAt)}
        </span>
      ),
    },
    {
      key: "excerpt",
      header: "Extracto",
      render: (post: Post) => (
        <span className="truncate max-w-[200px] text-muted-foreground block">
          {post.excerpt}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (post: Post) => (
        <TableActions>
          <TableActionBtn
            variant="view"
            href={ROUTES.POSTS_EDIT(post.slug)}
            title="Ver"
          />
          <TableActionBtn
            variant="edit"
            href={ROUTES.POSTS_EDIT(post.slug)}
            title="Editar"
          />
          {onDeleteClick && (
            <TableActionBtn
              variant="delete"
              onClick={() => onDeleteClick(post)}
              title="Eliminar"
            />
          )}
        </TableActions>
      ),
    },
  ], [onDeleteClick]);
};
