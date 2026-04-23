import React from "react";
import { useTagInput } from "./useTagInput";
import { Chip, TextField } from "@/presentation/components/common";

interface TagInputProps {
  value: string[];
  onChange?: (tags: string[]) => void;
}

export const TagInput = ({ value, onChange }: TagInputProps) => {
  const {
    search,
    suggestions,
    selectedTags,
    isLoading,
    error,
    setSearch,
    addTag,
    removeTag,
  } = useTagInput({ value, onChange });
  const renderDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
          <div className="h-3 w-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Cargando sugerencias...
        </div>
      );
    }

    if (suggestions.length > 0) {
      return suggestions.map((tag) => (
        <button
          key={tag.slug}
          type="button"
          onClick={() => addTag(tag.slug)}
          className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors focus:bg-muted focus:outline-hidden"
        >
          {tag.name}
        </button>
      ));
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <TextField
          label="Tags"
          placeholder="Buscar tags..."
          value={search}
          error={error ? "Error al cargar tags" : undefined}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (isLoading || suggestions.length > 0) && (
          <div className="absolute z-10 w-full bg-background border border-border rounded-lg shadow-lg mt-1 overflow-hidden py-1">
            {renderDropdownContent()}
          </div>
        )}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {selectedTags.map((tag) => (
            <Chip
              key={tag.slug}
              name={tag.name}
              onRemove={() => removeTag(tag.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
