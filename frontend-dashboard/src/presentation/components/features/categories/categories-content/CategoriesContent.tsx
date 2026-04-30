"use client";

import {
  EmptyState,
  ErrorState,
  FetchState,
  PageHeader,
} from "@/presentation/components/common";
import { FolderOpen, Plus } from "lucide-react";
import { useCategoriesContent } from "./useCategoriesContent";
import { CategoryModal } from "../category-modal";
import { CategoryCard } from "../category-card";

export const CategoriesContent = () => {
  const {
    sortedGroupedCategories,
    error,
    isLoading,
    isCreateModalOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
  } = useCategoriesContent();

  if (isLoading) return <FetchState message="Cargando categorías..." />;

  if (error)
    return (
      <ErrorState
        message="Error al cargar las categorías"
        showBackButton={false}
      />
    );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categorías"
        description="Administra las categorías de tu blog"
        action={{
          label: "Crear Categoría",
          icon: <Plus size={16} />,
          onClick: handleOpenCreateModal,
        }}
      />

      {sortedGroupedCategories &&
        !Object.keys(sortedGroupedCategories).length && (
          <EmptyState
            title="No hay categorías"
            description="Crea una categoría para empezar"
            icon={<FolderOpen size={48} />}
          />
        )}

      {Object.entries(sortedGroupedCategories ?? {}).map(
        ([letter, categories]) => (
          <div key={letter}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-px bg-border" />
              <h2 className="text-lg font-semibold">{letter}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        ),
      )}
      <CategoryModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
};
