"use client";

import { Controller } from "react-hook-form";
import { usePostForm } from "./usePostForm";
import {
  Button,
  ErrorState,
  FetchState,
  MarkdownEditor,
  Switch,
  TextArea,
  TextField,
} from "@/presentation/components/common";
import { CategorySelect } from "./_components/category-select";
import { TagInput } from "./_components/tag-input";

interface PostFormProps {
  mode?: "create" | "edit";
  slug?: string;
}

export const PostForm = ({ mode = "create", slug }: PostFormProps) => {
  const { form, onSubmit, onCancel, isLoading, isFetchingPost, fetchError } =
    usePostForm({
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
        <div className="card space-y-5">
          <TextField
            label="Título"
            placeholder="Ej: Mi primer post sobre React"
            {...register("title")}
            error={errors.title?.message}
            maxLength={60}
          />

          <TextArea
            label="Extracto"
            placeholder="Un breve resumen que aparecerá en las previsualizaciones..."
            rows={3}
            {...register("excerpt")}
            error={errors.excerpt?.message}
            maxLength={200}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <CategorySelect value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <TagInput value={field.value || []} onChange={field.onChange} />
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field }) => (
              <MarkdownEditor
                label="Contenido"
                value={field.value}
                onChange={field.onChange}
                error={errors.content?.message}
              />
            )}
          />

          {/* Toggle publicación */}
          <Switch label="Publicar inmediatamente" {...register("published")} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" isLoading={isLoading}>
            {mode === "edit" ? "Guardar cambios" : "Crear entrada"}
          </Button>
        </div>
      </form>
    </div>
  );
};
