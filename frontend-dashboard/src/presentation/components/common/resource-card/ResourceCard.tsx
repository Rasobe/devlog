import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../Button";

export interface ResourceCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

export const ResourceCard = ({
  title,
  subtitle,
  icon,
  onEdit,
  onDelete,
}: ResourceCardProps) => {
  return (
    <div className="flex flex-col bg-background border rounded-lg p-4 gap-4 min-w-0">
      <div className="flex flex-row gap-3 items-start min-w-0">
        <div className="flex items-center justify-center p-2 bg-primary/20 text-primary rounded-lg h-auto aspect-square shrink-0">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-lg font-bold truncate" title={title}>
            {title}
          </h2>
          <p className="text-sm text-muted-foreground truncate" title={subtitle}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-2 border-t border-border/50">
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onEdit} aria-label="Editar">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="danger-outline" onClick={onDelete} aria-label="Eliminar">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
