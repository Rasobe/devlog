"use client";

import { CreatePostInput, UpdatePostInput } from "@/domain/models/post.model";
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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UsePostFormProps {
  slug?: string;
}

export const usePostForm = ({ slug }: UsePostFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPostLoaded, setIsPostLoaded] = useState<boolean>(false);
  const [isFetchingPost, setIsFetchingPost] = useState<boolean>(!!slug);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const form = useForm<CreatePostSchema>({
    defaultValues: defaultCreatePostValues,
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setIsFetchingPost(true);
        setFetchError(false);
        const post = await getPostBySlugUseCase.execute(slug);

        if (post) {
          form.reset({
            title: post.title,
            excerpt: post.excerpt || "",
            content: post.content,
            published: post.published,
          });
          setIsPostLoaded(true);
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Error al obtener la entrada", error);
        setFetchError(true);
      } finally {
        setIsFetchingPost(false);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const createPost = async (data: CreatePostInput) => {
    try {
      await createPostUseCase.execute(data);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(ROUTES.DASHBOARD);
    } catch (error: unknown) {
      console.error("Error al crear el post:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al crear el post.";
      setServerError(errorMessage);
    }
  };

  const updatePost = async (data: UpdatePostInput) => {
    if (!slug) return;
    try {
      await updatePostUseCase.execute(slug, data);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(ROUTES.DASHBOARD);
    } catch (error: unknown) {
      console.error("Error al actualizar el post:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al actualizar el post.";
      setServerError(errorMessage);
    }
  };

  const onSubmitHandler = async (data: CreatePostSchema) => {
    setServerError(null);

    if (isPostLoaded && slug) {
      updatePost(data);
    } else {
      createPost(data);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmitHandler),
    isLoading: form.formState.isSubmitting,
    serverError,
    isPostLoaded,
    isFetchingPost,
    fetchError,
  };
};
