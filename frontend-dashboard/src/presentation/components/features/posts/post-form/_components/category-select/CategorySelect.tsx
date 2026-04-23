import React from "react";
import { useCategorySelect } from "./useCategorySelect";
import { Select } from "@/presentation/components/common";

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { options, isLoading, error } = useCategorySelect();

  return (
    <Select
      label="Categoría"
      value={value}
      options={options}
      onChange={onChange}
      disabled={isLoading}
      error={error?.message}
      placeholder={isLoading ? "Cargando..." : "Sin categoría"}
    />
  );
};
