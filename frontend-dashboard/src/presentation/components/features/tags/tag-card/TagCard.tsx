"use client";

import { Tag } from "@/domain/models";
import { Tag as TagIcon } from "lucide-react";
import {
  ResourceCard,
  DeleteConfirmationModal,
} from "@/presentation/components/common";
import { useTagCardActions } from "./useTagCardActions";
import { TagModal } from "../tag-modal";

interface TagCardProps {
  tag: Tag;
}

export const TagCard = ({ tag }: TagCardProps) => {
  const {
    tagToDelete,
    isDeleteLoading,
    isEditModalOpen,
    onOpenEditModal,
    onDelete,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCloseEditModal,
  } = useTagCardActions({ tag });

  return (
    <>
      <ResourceCard
        title={tag.name}
        subtitle={tag.slug}
        icon={<TagIcon size={24} />}
        onEdit={onOpenEditModal}
        onDelete={onOpenDeleteModal}
      />

      <TagModal open={isEditModalOpen} onClose={onCloseEditModal} tag={tag} />

      <DeleteConfirmationModal
        open={!!tagToDelete}
        title="Eliminar etiqueta"
        message="¿Estás seguro de que quieres eliminar esta etiqueta?"
        isLoading={isDeleteLoading}
        onDelete={onDelete}
        onClose={onCloseDeleteModal}
      />
    </>
  );
};
