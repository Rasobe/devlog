"use client";

import Link from "next/link";
import { usePostForm } from "./usePostForm";
import { TextField } from "../../ui/TextField";
import { TextArea } from "../../ui/TextArea";
import { Button } from "../../ui/Button";

const PostForm = () => {
  const { form, onSubmit, isLoading, serverError } = usePostForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Nueva entrada
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crea una nueva entrada para tu blog.
          </p>
        </div>
        <Link href="/dashboard">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Link>
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
          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                {...register("published")}
              />
              <div className="h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-ring/50 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full" />
            </label>
            <span className="text-sm font-medium text-foreground">
              Publicar inmediatamente
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" isLoading={isLoading}>
            Crear entrada
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
