"use client";

import { useState, useEffect } from "react";
import { DataTableSearch } from "./DataTable";

interface UseDataTableProps {
  search?: DataTableSearch;
}

export const useDataTable = ({ search }: UseDataTableProps) => {
  const [localSearch, setLocalSearch] = useState(search?.value || "");
  const [prevSearchValue, setPrevSearchValue] = useState(search?.value);

  if (search?.value !== prevSearchValue) {
    setPrevSearchValue(search?.value);
    setLocalSearch(search?.value || "");
  }

  useEffect(() => {
    if (!search) return;

    const timer = setTimeout(() => {
      if (localSearch !== search.value) {
        search.onChange(localSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, search]);

  return {
    localSearch,
    setLocalSearch,
  };
};
