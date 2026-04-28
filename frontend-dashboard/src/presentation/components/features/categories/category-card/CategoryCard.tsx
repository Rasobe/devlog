"use client";

import { Category } from "@/domain/models";
import { FolderOpen } from "lucide-react";
import {
  ResourceCard,
  DeleteConfirmationModal,
} from "@/presentation/components/common";
import { useCategoryCardActions } from "./useCategoryCardActions";
import { CategoryModal } from "../category-modal";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const {
    categoryToDelete,
    isDeleteLoading,
    isEditModalOpen,
    onOpenEditModal,
    onDelete,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCloseEditModal,
  } = useCategoryCardActions({ category });

  return (
    <>
      <ResourceCard
        title={category.name}
        subtitle={category.slug}
        icon={<FolderOpen size={24} />}
        onEdit={onOpenEditModal}
        onDelete={onOpenDeleteModal}
      />

      <CategoryModal
        open={isEditModalOpen}
        onClose={onCloseEditModal}
        category={category}
      />

      <DeleteConfirmationModal
        open={!!categoryToDelete}
        title="Eliminar categoría"
        message="¿Estás seguro de que quieres eliminar esta categoría?"
        isLoading={isDeleteLoading}
        onDelete={onDelete}
        onClose={onCloseDeleteModal}
      />
    </>
  );
};
