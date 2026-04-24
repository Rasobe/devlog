import { Category } from "@/domain/models";
import { getAllCategoriesUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesContent = () => {
  const { data: categories, error } = useQuery({
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

  return { sortedGroupedCategories, error };
};
