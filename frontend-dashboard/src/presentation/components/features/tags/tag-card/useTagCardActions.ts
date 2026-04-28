import { Tag } from "@/domain/models";
import { deleteTagUseCase, queryKeys } from "@/infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface UseTagCardActionsProps {
  tag: Tag;
}

export const useTagCardActions = ({ tag }: UseTagCardActionsProps) => {
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteTag, isPending: isDeleteLoading } = useMutation({
    mutationFn: () => deleteTagUseCase.execute(tag.slug),
    mutationKey: queryKeys.tags.delete(tag.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all() });
      onCloseDeleteModal();
      toast.success("Etiqueta eliminada exitosamente");
    },
    onError: (error: any) => {
      const message =
        error?.message?.includes("foreign key") ||
        error?.message?.includes("Failed query")
          ? "No puedes eliminar una etiqueta que tiene posts asociados"
          : "Error al eliminar la etiqueta";
      toast.error(message);
    },
  });

  const onOpenEditModal = () => setIsEditModalOpen(true);
  const onCloseEditModal = () => setIsEditModalOpen(false);

  const onOpenDeleteModal = () => setTagToDelete(tag);
  const onCloseDeleteModal = () => setTagToDelete(null);

  const onDelete = () => deleteTag();

  return {
    tagToDelete,
    isDeleteLoading,
    isEditModalOpen,
    onOpenEditModal,
    onDelete,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCloseEditModal,
  };
};
