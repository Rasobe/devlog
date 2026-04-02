import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostUseCase } from "@/infrastructure/dependencies";
import {
  createPostSchema,
  defaultCreatePostValues,
  type CreatePostSchema,
} from "@/presentation/schemas/post.schema";

export const usePostForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CreatePostSchema>({
    defaultValues: defaultCreatePostValues,
    resolver: zodResolver(createPostSchema),
  });

  const onSubmitHandler = async (data: CreatePostSchema) => {
    setServerError(null);

    try {
      await createPostUseCase.execute(data);
      router.push("/dashboard");
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
  };
};
