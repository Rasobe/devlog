"use client";

import { formatShortDate } from "@/core/utils";
import { useRecentPosts } from "./useRecentPosts";
import {
  Badge,
  TableActions,
  TableActionBtn,
  ErrorState,
  DataTable,
} from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";
import { Post } from "@/domain/models/post.model";

const columns = [
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
      </TableActions>
    ),
  },
];

export const RecentPosts = () => {
  const { posts, isLoading, error } = useRecentPosts();

  if (error) {
    return <ErrorState showBackButton={false} />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Tus Publicaciones Recientes
      </h2>

      <DataTable<Post> 
      data={posts || []} 
      columns={columns} 
      pagination={{
        currentPage: 0,
        totalPages: 1,
        onPageChange: () => {},
      }} 
    />
    </div>
  );
};
