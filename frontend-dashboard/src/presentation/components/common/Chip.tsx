import { X } from "lucide-react";
import React from "react";

interface ChipProps {
  name: string;
  onRemove?: () => void;
}

export const Chip = ({ name, onRemove }: ChipProps) => {
  return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
      {name}
      {onRemove && (
        <button type="button" onClick={onRemove}>
          <X size={12} />
        </button>
      )}
    </span>
  );
};
