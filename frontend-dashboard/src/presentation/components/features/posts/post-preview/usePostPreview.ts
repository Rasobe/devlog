import { queryKeys } from "@/infrastructure";
import { getPostBySlugUseCase } from "@/infrastructure/dependencies";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface UsePostPreviewProps {
  slug?: string;
}

export const usePostPreview = ({ slug }: UsePostPreviewProps) => {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.posts.detail(slug ?? ""),
    queryFn: () => {
      if (!slug) return;
      return getPostBySlugUseCase.execute(slug);
    },
    throwOnError: () => {
      toast.error("Error al obtener la publicación");
      return true;
    },
  });

  return {
    post,
    isLoading,
    isError,
  };
};
