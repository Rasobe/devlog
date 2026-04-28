"use client";

import { cn } from "@/core/utils";
import { Button, Divider, TextField } from "@/presentation/components/common";
import { Pencil } from "lucide-react";
import { Controller } from "react-hook-form";
import { useResourceModal } from "./useResourceModal";

interface ResourceModalProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (name: string) => void;
  isEditing: boolean;
  title: string;
  icon: React.ReactNode;
  submitLabel: string;
  placeholder?: string;
  defaultName?: string;
}

export const ResourceModal = ({
  open,
  onClose,
  isLoading,
  onSubmit,
  isEditing,
  title,
  icon,
  submitLabel,
  placeholder,
  defaultName,
}: ResourceModalProps) => {
  const { form, onCloseModal } = useResourceModal({
    name: defaultName,
    onClose,
  });

  if (!open) return null;

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data.name);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-in bg-black/50 fade-in duration-200">
      <div className="bg-background px-8 py-10 rounded-lg shadow-lg flex flex-col gap-4 min-w-md max-w-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div
            className={cn(
              "flex justify-center items-center rounded-full p-4",
              isEditing ? "bg-amber-500/30" : "bg-blue-500/30",
            )}
          >
            {icon}
          </div>
          <h2 className="text-lg font-semibold text-center">{title}</h2>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                label="Nombre"
                placeholder={placeholder ?? "Introduce un nombre"}
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
            variant={isEditing ? "warning" : "success"}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            <Pencil className="w-4 h-4" />
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
