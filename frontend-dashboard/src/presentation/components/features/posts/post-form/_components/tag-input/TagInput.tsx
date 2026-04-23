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
  return (
    <div className="flex flex-col gap-2">
      <div>
        <TextField
          label="Tags"
          placeholder="Buscar tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && suggestions.length > 0 && (
          <div className="bg-background border border-border rounded-lg shadow-lg mt-1 overflow-hidden py-1">
            {suggestions.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() => addTag(tag.slug)}
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {selectedTags.map((tag) => (
          <Chip
            key={tag.slug}
            name={tag.name}
            onRemove={() => removeTag(tag.slug)}
          />
        ))}
      </div>
    </div>
  );
};
