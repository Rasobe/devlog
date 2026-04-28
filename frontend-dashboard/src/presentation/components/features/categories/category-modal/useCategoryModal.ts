import { Category } from "@/domain/models";
import {
  createCategoryUseCase,
  queryKeys,
  updateCategoryUseCase,
} from "@/infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCategoryModalProps {
  category?: Category;
  onClose: () => void;
}

export const useCategoryModal = ({
  category,
  onClose,
}: UseCategoryModalProps) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategoryUseCase.execute(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      onClose();
      toast.success("Categoría creada exitosamente");
    },
    onError: () => {
      toast.error("Error al crear la categoría");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (name: string) =>
      updateCategoryUseCase.execute(category!.slug, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      onClose();
      toast.success("Categoría actualizada exitosamente");
    },
    onError: () => {
      toast.error("Error al actualizar la categoría");
    },
  });

  const handleSubmit = (name: string) => {
    if (category) {
      updateMutation.mutate(name);
    } else {
      createMutation.mutate(name);
    }
  };

  return {
    isLoading: createMutation.isPending || updateMutation.isPending,
    handleSubmit,
  };
};
