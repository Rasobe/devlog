import { Category } from "@/domain/models";
import {
  createCategoryUseCase,
  queryKeys,
  updateCategoryUseCase,
} from "@/infrastructure";
import {
  categorySchema,
  CategorySchema,
  defaultCategoryValues,
} from "@/presentation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UseCategoryModalProps {
  category?: Category;
  onClose: () => void;
}

export const useCategoryModal = ({
  category,
  onClose,
}: UseCategoryModalProps) => {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValues,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    form.reset({ name: category?.name || "" });
  }, [category]);

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategoryUseCase.execute(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      onCloseModal();
      toast.success("Categoría creada correctamente");
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
      onCloseModal();
      toast.success("Categoría actualizada correctamente");
    },
    onError: () => {
      toast.error("Error al actualizar la categoría");
    },
  });

  const onSubmit = form.handleSubmit((data: CategorySchema) => {
    if (category) {
      updateMutation.mutate(data.name);
    } else {
      createMutation.mutate(data.name);
    }
  });

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  return {
    isLoading: createMutation.isPending || updateMutation.isPending,
    form,
    onSubmit,
    onCloseModal,
  };
};
