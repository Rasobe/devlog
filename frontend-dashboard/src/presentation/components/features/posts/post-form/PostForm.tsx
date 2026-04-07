"use client";

import { usePostForm } from "./usePostForm";
import {
  Button,
  ErrorState,
  FetchState,
  Switch,
  TextArea,
  TextField,
} from "@/presentation/components/global";

interface PostFormProps {
  mode?: "create" | "edit";
  slug?: string;
}

export const PostForm = ({ mode = "create", slug }: PostFormProps) => {
  const {
    form,
    onSubmit,
    onCancel,
    isLoading,
    serverError,
    isPostLoaded,
    isFetchingPost,
    fetchError,
  } = usePostForm({
    slug,
  });
  const {
    register,
    formState: { errors },
  } = form;

  if (isFetchingPost) {
    return <FetchState />;
  }

  if (fetchError) {
    return <ErrorState />;
  }

  return (
    <div>
      {!slug || isPostLoaded ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {mode === "edit" ? "Editar entrada" : "Nueva entrada"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "edit"
                  ? "Edita la entrada"
                  : "Crea una nueva entrada para tu blog."}
              </p>
            </div>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/50 dark:text-red-400">
                {serverError}
              </div>
            )}

            <div className="card space-y-5">
              <TextField
                label="Título"
                placeholder="Ej: Mi primer post sobre React"
                {...register("title")}
                error={errors.title?.message}
              />

              <TextArea
                label="Extracto"
                placeholder="Un breve resumen que aparecerá en las previsualizaciones..."
                rows={3}
                {...register("excerpt")}
                error={errors.excerpt?.message}
              />

              <TextArea
                label="Contenido"
                placeholder="Escribe el contenido de tu entrada..."
                rows={12}
                {...register("content")}
                error={errors.content?.message}
              />

              {/* Toggle publicación */}
              <Switch
                label="Publicar inmediatamente"
                {...register("published")}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="gradient" isLoading={isLoading}>
                {mode === "edit" ? "Guardar cambios" : "Crear entrada"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
