"use client";

import { cn } from "@/core/utils";
import { Category } from "@/domain/models";
import { Button, Divider, TextField } from "@/presentation/components/common";
import { FolderOpen, Pencil } from "lucide-react";
import { useCategoryModal } from "./useCategoryModal";
import { Controller } from "react-hook-form";

interface CategoryModalProps {
  category?: Category;
  open: boolean;
  onClose: () => void;
}

export const CategoryModal = ({
  category,
  open,
  onClose,
}: CategoryModalProps) => {
  const { isLoading, form, onSubmit, onCloseModal } = useCategoryModal({
    category,
    onClose,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-in bg-black/50 fade-in duration-200">
      <div className="bg-background px-8 py-10 rounded-lg shadow-lg flex flex-col gap-4 min-w-md max-w-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div
            className={cn(
              "flex justify-center items-center rounded-full p-4",
              category ? "bg-amber-500/30" : "bg-blue-500/30",
            )}
          >
            {category ? (
              <Pencil className="w-6 h-6 text-amber-300" />
            ) : (
              <FolderOpen className="w-6 h-6 text-blue-300" />
            )}
          </div>
          <h2 className="text-lg font-semibold text-center">
            {category ? "Editar categoría" : "Crear categoría"}
          </h2>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                label="Nombre"
                placeholder="Nombre de la categoría"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <Divider />
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button
            variant={category ? "warning" : "success"}
            onClick={onSubmit}
            isLoading={isLoading}
          >
            {category ? (
              <Pencil className="w-4 h-4" />
            ) : (
              <FolderOpen className="w-4 h-4" />
            )}
            {category ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </div>
    </div>
  );
};
