"use client";

import Link from "next/link";
import { usePostForm } from "./usePostForm";
import { Button, TextArea, TextField } from "@/presentation/components/global";

interface PostFormProps {
  readOnly?: boolean;
  slug?: string;
}

export const PostForm = ({ readOnly = false, slug }: PostFormProps) => {
  const {
    form,
    onSubmit,
    isLoading,
    serverError,
    isEditable,
    isFetchingPost,
    fetchError,
  } = usePostForm({
    slug,
  });
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      {!slug || (isEditable && slug) ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {readOnly ? "Editar entrada" : "Nueva entrada"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {readOnly
                  ? "Edita la entrada"
                  : "Crea una nueva entrada para tu blog."}
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
                readOnly={readOnly}
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
                <label
                  className={`relative inline-flex items-center ${readOnly ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    {...register("published")}
                    disabled={readOnly}
                  />
                  <div
                    className={`h-6 w-11 rounded-full bg-muted transition-colors ${readOnly ? "opacity-50" : ""} peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-ring/50 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full`}
                  />
                </label>
                <span className="text-sm font-medium text-foreground">
                  {readOnly ? "Publicado" : "Publicar inmediatamente"}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="gradient"
                isLoading={isLoading}
                disabled={readOnly}
              >
                {readOnly ? "Guardar cambios" : "Crear entrada"}
              </Button>
            </div>
          </form>
        </div>
      ) : isFetchingPost ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Cargando datos de la entrada...
          </p>
        </div>
      ) : fetchError ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100/50 dark:bg-red-900/20">
            <svg
              className="h-7 w-7 text-red-600 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">
            No se pudo cargar la entrada
          </h3>
          <p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">
            Es posible que el enlace esté roto, que no tengas permisos, o que el
            artículo haya sido eliminado previamente.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Volver al panel</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
