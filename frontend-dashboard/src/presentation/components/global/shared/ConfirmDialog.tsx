import { Button } from "../primitives";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDialogProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-150 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={(e) => e.stopPropagation()}
        className={`bg-background rounded-lg border border-border max-w-sm w-full mx-4 transition-all duration-150 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="bg-muted/50 px-6 py-4 rounded-t-lg">
          <h3 id="dialog-title" className="font-medium">
            {title}
          </h3>
        </div>
        <div className="px-6 py-4">
          <p id="dialog-description" className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
