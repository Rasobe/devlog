import { GetPostsResponse } from "@/infrastructure/api";
import { getPostsUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useDashboardTable = () => {
  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
  });

  return { data, isLoading, error };
};
