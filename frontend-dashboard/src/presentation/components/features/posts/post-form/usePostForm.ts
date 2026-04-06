"use client";

import { createPostUseCase, getPostBySlugUseCase } from "@/infrastructure/dependencies";
import { ROUTES } from "@/presentation/config/routes";
import {
  createPostSchema,
  defaultCreatePostValues,
  type CreatePostSchema,
} from "@/presentation/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UsePostFormProps {
  slug?: string;
}

export const usePostForm = ({ slug }: UsePostFormProps) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
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
          setIsEditable(true);
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
  }, [slug, form]);

  const onSubmitHandler = async (data: CreatePostSchema) => {
    setServerError(null);

    try {
      await createPostUseCase.execute(data);
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

  return {
    form,
    onSubmit: form.handleSubmit(onSubmitHandler),
    isLoading: form.formState.isSubmitting,
    serverError,
    isEditable,
    isFetchingPost,
    fetchError,
  };
};
