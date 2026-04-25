import { Tag } from "@/domain/models";
import { useTagModal } from "./useTagModal";
import { ResourceModal } from "@/presentation/components/common";
import { Tag as TagIcon } from "lucide-react";

interface TagModalProps {
  tag?: Tag;
  open: boolean;
  onClose: () => void;
}

export const TagModal = ({ tag, open, onClose }: TagModalProps) => {
  const { isLoading, handleSubmit } = useTagModal({ tag, onClose });

  return (
    <ResourceModal
      open={open}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isEditing={!!tag}
      title={tag ? "Editar etiqueta" : "Crear etiqueta"}
      icon={<TagIcon size={24} />}
      submitLabel={tag ? "Actualizar" : "Crear"}
      placeholder={tag ? "Introduce el nuevo nombre" : "Introduce un nombre"}
      defaultName={tag?.name}
    />
  );
};
