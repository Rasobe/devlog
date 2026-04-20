import { formatFullDate, formatCompactNumber } from "@/core/utils";
import { Post } from "@/domain/models/post.model";
import {
  Badge,
  TableActionBtn,
  TableActions,
} from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";
import { useMemo } from "react";

export interface UsePostsContentColumns {
  onDeleteClick?: (post: Post) => void;
}

export const usePostsContentColumns = ({
  onDeleteClick,
}: UsePostsContentColumns = {}) => {
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
        key: "views",
        header: "Visitas",
        render: (post: Post) => (
          <Badge variant="default">{formatCompactNumber(post.views)}</Badge>
        ),
      },
      {
        key: "date",
        header: "Fecha",
        render: (post: Post) => (
          <span className="text-muted-foreground">
            {formatFullDate(post.createdAt)}
          </span>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (post: Post) => (
          <TableActions>
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
