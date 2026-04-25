import { ResourceModal } from "@/presentation/components/common";
import { useCategoryModal } from "./useCategoryModal";
import { Category } from "@/domain/models";
import { FolderOpen } from "lucide-react";

interface CategoryModalProps {
  category?: Category;
  open: boolean;
  onClose: () => void;
}

export const CategoryModal = ({
  category,
  open,
  onClose,
}: CategoryModalProps) => {
  const { isLoading, handleSubmit } = useCategoryModal({ category, onClose });

  return (
    <ResourceModal
      open={open}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isEditing={!!category}
      title={category ? "Editar categoría" : "Crear categoría"}
      icon={<FolderOpen size={24} />}
      submitLabel={category ? "Actualizar" : "Crear"}
      placeholder={
        category ? "Introduce el nuevo nombre" : "Introduce un nombre"
      }
      defaultName={category?.name}
    />
  );
};
