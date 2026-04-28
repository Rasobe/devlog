import { Tag } from "@/domain/models";
import {
  createTagUseCase,
  queryKeys,
  updateTagUseCase,
} from "@/infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseTagModalProps {
  tag?: Tag;
  onClose: () => void;
}

export const useTagModal = ({ tag, onClose }: UseTagModalProps) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (name: string) => createTagUseCase.execute(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all() });
      onClose();
      toast.success("Etiqueta creada exitosamente");
    },
    onError: (error) => {
      toast.error("Error al crear la etiqueta");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (name: string) => updateTagUseCase.execute(tag!.slug, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all() });
      onClose();
      toast.success("Etiqueta actualizada exitosamente");
    },
    onError: () => {
      toast.error("Error al actualizar la etiqueta");
    },
  });

  const handleSubmit = (name: string) => {
    if (tag) {
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
