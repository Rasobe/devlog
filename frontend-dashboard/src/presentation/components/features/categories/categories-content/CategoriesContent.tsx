"use client";

import {
  CategoryCard,
  EmptyState,
  ErrorState,
} from "@/presentation/components/common";
import { Tag } from "lucide-react";
import { useCategoriesContent } from "./useCategoriesContent";

export const CategoriesContent = () => {
  const { sortedGroupedCategories, error } = useCategoriesContent();

  if (error)
    return (
      <ErrorState
        message="Error al cargar las categorías"
        showBackButton={false}
      />
    );

  if (Object.keys(sortedGroupedCategories ?? {}).length === 0)
    return (
      <EmptyState
        title="No hay categorías"
        description="Crea una categoría para empezar"
        icon={<Tag size={48} />}
      />
    );

  return (
    <div className="flex flex-col gap-8">
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
    </div>
  );
};
