"use client";

import {
  CategoryCard,
  EmptyState,
  ErrorState,
} from "@/presentation/components/common";
import { Tag } from "lucide-react";
import { useCategoriesContent } from "./useCategoriesContent";

export const CategoriesContent = () => {
  const { categories, error } = useCategoriesContent();

  if (error)
    return (
      <ErrorState
        message="Error al cargar las categorías"
        showBackButton={false}
      />
    );

  if (categories?.length === 0)
    return (
      <EmptyState
        title="No hay categorías"
        description="Crea una categoría para empezar"
        icon={<Tag size={48} />}
      />
    );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
};
