import { Category } from "@/domain/models";
import { getAllCategoriesUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCategoriesContent = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.categories.all(),
    queryFn: () => getAllCategoriesUseCase.execute(),
  });

  const groupedCategories = categories?.reduce(
    (acc, category) => {
      const letter = category.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(category);
      return acc;
    },
    {} as Record<string, Category[]>,
  );

  const sortedGroupedCategories = groupedCategories
    ? Object.fromEntries(
        Object.entries(groupedCategories).sort(([a], [b]) =>
          a.localeCompare(b),
        ),
      )
    : undefined;

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  return {
    sortedGroupedCategories,
    isLoading,
    error,
    isCreateModalOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
  };
};
