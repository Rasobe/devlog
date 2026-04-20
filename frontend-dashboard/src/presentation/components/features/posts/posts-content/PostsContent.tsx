"use client";

import { Post, PostStatus } from "@/domain/models/post.model";
import { usePostsContent } from "./usePostsContent";
import {
  DataTable,
  DeleteConfirmationModal,
  ErrorState,
  Select,
} from "@/presentation/components/global";
import { usePostsContentColumns } from "./PostsContent.table-config";

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
    handleDeleteClick,
    postToDelete,
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
