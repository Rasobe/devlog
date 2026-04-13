"use client";

import { Post, PostStatus } from "@/domain/models/post.model";
import { usePostsContent } from "./usePostsContent";
import {
  Badge,
  DataTable,
  ErrorState,
  Select,
  TableActionBtn,
  TableActions,
} from "@/presentation/components/global";
import { formatFullDate } from "@/core/utils";
import { ROUTES } from "@/presentation/config/routes";

const columns = [
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

const statusOptions = [
  { value: "ALL", label: "Todos" },
  { value: "PUBLISHED", label: "Publicados" },
  { value: "DRAFT", label: "Borradores" },
];

export const PostsContent = () => {
  const {
    posts,
    isLoading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    totalPages,
    currentPage,
  } = usePostsContent();

  if (error) {
    return (
      <ErrorState message="Error al cargar los posts" showBackButton={false} />
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <DataTable<Post>
        data={posts}
        columns={columns}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Buscar por título...",
        }}
        filters={[
          {
            key: "status",
            render: () => (
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                options={statusOptions}
              />
            ),
          },
        ]}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setPage,
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
