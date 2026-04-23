import { getAllCategoriesUseCase, queryKeys } from "@/infrastructure";
import { SelectOption } from "@/presentation/components/common";
import { useQuery } from "@tanstack/react-query";

export const useCategorySelect = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.categories.all(),
    queryFn: () => getAllCategoriesUseCase.execute(),
  });

  const options: SelectOption[] =
    data?.map((category) => ({
      value: category.slug,
      label: category.name,
    })) ?? [];

  return { options, isLoading, error };
};
