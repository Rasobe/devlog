import { Category } from "@/domain/models";
import { deleteCategoryUseCase, queryKeys } from "@/infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface UseCategoryCardActionsProps {
  category: Category;
}

export const useCategoryCardActions = ({
  category,
}: UseCategoryCardActionsProps) => {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategory, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: () => deleteCategoryUseCase.execute(category.slug),
      mutationKey: queryKeys.categories.delete(category.slug),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
        onCloseDeleteModal();
        toast.success("Categoría eliminada correctamente");
      },
      onError: (error: any) => {
        const message =
          error?.message?.includes("foreign key") ||
          error?.message?.includes("Failed query")
            ? "No puedes eliminar una categoría que tiene posts asociados"
            : "Error al eliminar la categoría";
        toast.error(message);
      },
    });

  const onOpenEditModal = () => setIsEditModalOpen(true);
  const onCloseEditModal = () => setIsEditModalOpen(false);

  const onOpenDeleteModal = () => setCategoryToDelete(category);
  const onCloseDeleteModal = () => setCategoryToDelete(null);

  const onDelete = () => deleteCategory();

  return {
    categoryToDelete,
    isDeleteLoading,
    isEditModalOpen,
    onOpenEditModal,
    onDelete,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCloseEditModal,
  };
};
