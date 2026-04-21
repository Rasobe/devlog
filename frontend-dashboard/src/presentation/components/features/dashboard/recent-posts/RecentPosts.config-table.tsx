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

export const useRecentPostsColumns = ({
  onDeleteClick,
}: UseRecentPostsColumnsProps = {}) => {
  return useMemo(
    () => [
      {
        key: "title",
        header: "Título",
        render: (post: Post) => (
          <span className="font-medium text-foreground">{post.title}</span>
        ),
      },
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
        key: "createdAt",
        header: "Creado",
        render: (post: Post) => (
          <span className="text-muted-foreground">
            {formatShortDate(post.createdAt)}
          </span>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (post: Post) => (
          <TableActions>
            <TableActionBtn
              variant="preview"
              href={ROUTES.POSTS_PREVIEW(post.slug)}
              title="Previsualizar"
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
    ],
    [onDeleteClick],
  );
};
