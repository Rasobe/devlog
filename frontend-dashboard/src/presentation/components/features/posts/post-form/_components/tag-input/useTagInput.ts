import { getAllTagsUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface UseTagInputProps {
  value: string[];
  onChange?: (tags: string[]) => void;
}

export const useTagInput = ({ value, onChange }: UseTagInputProps) => {
  const [search, setSearch] = useState("");

  const {
    data: allTags,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.tags.all(),
    queryFn: () => getAllTagsUseCase.execute(),
  });

  const suggestions = (allTags ?? []).filter(
    (tag) =>
      tag.name.toLowerCase().includes(search.toLowerCase()) &&
      !value.includes(tag.slug),
  );

  const addTag = (slug: string) => {
    onChange?.([...value, slug]);
    setSearch("");
  };

  const removeTag = (slug: string) => {
    onChange?.(value.filter((t) => t !== slug));
  };

  const selectedTags = (allTags ?? []).filter((tag) =>
    value.includes(tag.slug),
  );

  return {
    search,
    suggestions,
    selectedTags,
    isLoading,
    error,
    setSearch,
    addTag,
    removeTag,
  };
};
