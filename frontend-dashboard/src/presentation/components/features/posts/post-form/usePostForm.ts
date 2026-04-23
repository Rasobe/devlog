"use client";

import { CreatePostInput, UpdatePostInput } from "@/domain/models/post.model";
import { queryKeys } from "@/infrastructure";
import {
  createPostUseCase,
  getPostBySlugUseCase,
  updatePostUseCase,
} from "@/infrastructure/dependencies";
import { ROUTES } from "@/presentation/config/routes";
import {
  createPostSchema,
  defaultCreatePostValues,
  type CreatePostSchema,
} from "@/presentation/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UsePostFormProps {
  slug?: string;
}

export const usePostForm = ({ slug }: UsePostFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreatePostSchema>({
    defaultValues: defaultCreatePostValues,
    resolver: zodResolver(createPostSchema),
  });

  const {
    data: post,
    isLoading: isFetchingPost,
    isError: fetchError,
  } = useQuery({
    queryKey: queryKeys.posts.detail(slug ?? ""),
    queryFn: () => {
      if (!slug) return null;
      return getPostBySlugUseCase.execute(slug);
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        published: post.published,
        category: post.category?.slug ?? "",
        tags: post.tags.map((t) => t.slug),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostInput) => createPostUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all() });
      router.push(ROUTES.POSTS);
      toast.success("Post creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el post");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: (data: UpdatePostInput) =>
      updatePostUseCase.execute(slug!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all() });
      if (slug) {
        queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(slug) });
      }
      router.push(ROUTES.POSTS);
      toast.success("Post actualizado exitosamente");
    },
    onError: () => {
      toast.error("Error al actualizar el post");
    },
  });

  const onSubmitHandler = async (data: CreatePostSchema) => {
    const input = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      published: data.published,
      categorySlug: data.category || undefined,
      tagSlugs: data.tags?.length ? data.tags : undefined,
    };

    if (!!post && slug) {
      updatePostMutation.mutate(input);
    } else {
      createPostMutation.mutate(input);
    }
  };

  const onCancel = () => {
    router.push(ROUTES.POSTS);
  };

  return {
    form,
    onCancel,
    onSubmit: form.handleSubmit(onSubmitHandler),
    isLoading: createPostMutation.isPending || updatePostMutation.isPending,
    isFetchingPost,
    fetchError,
  };
};
