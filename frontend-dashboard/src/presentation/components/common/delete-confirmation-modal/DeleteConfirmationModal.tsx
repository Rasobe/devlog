"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../Button";
import { Divider } from "../Divider";

interface DeleteConfirmationModalProps {
  title?: string;
  message?: string;
  open?: boolean;
  isLoading?: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export const DeleteConfirmationModal = ({
  title,
  message,
  open,
  isLoading,
  onDelete,
  onClose,
}: DeleteConfirmationModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-in bg-black/50 fade-in duration-200">
      <div className="bg-background px-8 py-10 rounded-lg shadow-lg flex flex-col gap-6 min-w-md max-w-md border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="flex justify-center items-center rounded-full p-4 bg-red-500/30">
            <Trash2 className="w-6 h-6 text-red-300" />
          </div>
          <h2 className="text-lg font-semibold text-center">{title}</h2>
          <h3 className="text-sm text-muted-foreground text-center">
            {message}
          </h3>
        </div>
        <Divider />
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onDelete} isLoading={isLoading}>
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};
