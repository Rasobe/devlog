"use client";

import { useRecentPosts } from "./useRecentPosts";
import {
  ErrorState,
  DataTable,
  DeleteConfirmationModal,
} from "@/presentation/components/common";
import { Post } from "@/domain/models/post.model";
import { useRecentPostsColumns } from "./RecentPosts.columns";

export const RecentPosts = () => {
  const {
    posts,
    error,
    postToDelete,
    isLoading,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseClick,
  } = useRecentPosts();

  const columns = useRecentPostsColumns({
    onDeleteClick: handleDeleteClick,
  });

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
        rowKey={(post) => post.slug}
        pagination={{
          currentPage: 0,
          totalPages: 1,
          onPageChange: () => {},
        }}
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
