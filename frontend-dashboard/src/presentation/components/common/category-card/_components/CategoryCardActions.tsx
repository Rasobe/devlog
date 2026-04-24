"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../Button";
import { Category } from "@/domain/models";
import { useCategoryCardActions } from "./category-card-actions/useCategoryCardActions";
import { DeleteConfirmationModal } from "../../delete-confirmation-modal";

interface CategoryCardActionsProps {
  category: Category;
}

export const CategoryCardActions = ({ category }: CategoryCardActionsProps) => {
  const {
    onEdit,
    onDelete,
    onOpenDeleteModal,
    onCloseDeleteModal,
    isDeleteLoading,
    categoryToDelete,
  } = useCategoryCardActions({ category });

  return (
    <div className="flex flex-row gap-2 justify-end">
      <Button variant="outline" onClick={onEdit}>
        <Pencil className="w-4 h-4" />
      </Button>
      <Button variant="danger-outline" onClick={onOpenDeleteModal}>
        <Trash2 className="w-4 h-4" />
      </Button>

      <DeleteConfirmationModal
        open={!!categoryToDelete}
        title="Eliminar categoría"
        message="¿Estás seguro de que quieres eliminar esta categoría?"
        isLoading={isDeleteLoading}
        onDelete={onDelete}
        onClose={onCloseDeleteModal}
      />
    </div>
  );
};
