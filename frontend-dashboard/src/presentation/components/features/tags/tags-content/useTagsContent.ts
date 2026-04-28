import { Tag } from "@/domain/models";
import { getAllTagsUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTagsContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    data: tags,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.tags.all(),
    queryFn: () => getAllTagsUseCase.execute(),
  });

  const groupedTags = tags?.reduce(
    (acc, tag) => {
      const letter = tag.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(tag);
      return acc;
    },
    {} as Record<string, Tag[]>,
  );

  const sortedGroupedTags = groupedTags
    ? Object.fromEntries(
        Object.entries(groupedTags).sort(([a], [b]) => a.localeCompare(b)),
      )
    : undefined;

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  return {
    sortedGroupedTags,
    isLoading,
    error,
    isCreateModalOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
  };
};
