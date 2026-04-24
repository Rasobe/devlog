import { getAllCategoriesUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesContent = () => {
  const { data: categories, error } = useQuery({
    queryKey: queryKeys.categories.all(),
    queryFn: () => getAllCategoriesUseCase.execute(),
  });

  return { categories, error };
};
