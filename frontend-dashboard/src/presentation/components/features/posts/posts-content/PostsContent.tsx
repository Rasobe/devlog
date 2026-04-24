"use client";

import { Post, PostStatus } from "@/domain/models/post.model";
import { usePostsContent } from "./usePostsContent";
import {
  DataTable,
  DeleteConfirmationModal,
  ErrorState,
  Select,
} from "@/presentation/components/common";
import { usePostsContentColumns } from "./PostsContent.columns";

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
    status,
    totalPages,
    currentPage,
    postToDelete,
    setSearch,
    setStatus,
    setPage,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseClick,
  } = usePostsContent();

  const columns = usePostsContentColumns({
    onDeleteClick: handleDeleteClick,
  });

  if (error) {
    return (
      <ErrorState message="Error al cargar los posts" showBackButton={false} />
    );
  }

  return (
    <div>
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
                onChange={(value) => setStatus(value as PostStatus)}
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
        rowKey={(post) => post.slug}
      />

      <DeleteConfirmationModal
        title="Borrar publicación"
        message={`¿Estás seguro de que deseas borrar la publicación "${postToDelete?.title}"?`}
        open={!!postToDelete}
        isLoading={isLoading}
        onDelete={handleDeleteConfirm}
        onClose={handleCloseClick}
      />
    </div>
  );
};
