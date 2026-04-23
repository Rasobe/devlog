"use client";

import { useState, useEffect } from "react";
import type { DataTableSearch } from "./DataTable";

interface UseDataTableProps {
  search?: DataTableSearch;
}

/**
 * Manages local debounced search state for the DataTable.
 * Keeps the input responsive while avoiding excessive upstream calls.
 */
export const useDataTable = ({ search }: UseDataTableProps) => {
  const [localSearch, setLocalSearch] = useState(search?.value ?? "");

  // Sync local state when the external value changes (e.g. parent resets the filter)
  useEffect(() => {
    setLocalSearch(search?.value ?? "");
  }, [search?.value]);

  // Debounce: notify the parent only after the user stops typing
  useEffect(() => {
    if (!search) return;

    const timer = setTimeout(() => {
      if (localSearch !== search.value) {
        search.onChange(localSearch);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return { localSearch, setLocalSearch };
};
