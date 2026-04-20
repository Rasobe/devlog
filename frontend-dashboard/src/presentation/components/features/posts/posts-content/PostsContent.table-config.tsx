import { formatFullDate } from "@/core/utils";
import { Post } from "@/domain/models/post.model";
import {
    Badge,
    TableActionBtn,
    TableActions,
} from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";

export const postsContentColumns = [
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
          variant="view"
          href={ROUTES.POSTS_EDIT(post.slug)}
          title="Ver"
        />
        <TableActionBtn
          variant="edit"
          href={ROUTES.POSTS_EDIT(post.slug)}
          title="Editar"
        />
      </TableActions>
    ),
  },
];
