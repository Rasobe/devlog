import { useState, useEffect } from "react";
import { DataTableSearch } from "./DataTable";

interface UseDataTableProps {
  search?: DataTableSearch;
}

export const useDataTable = ({ search }: UseDataTableProps) => {
  const [localSearch, setLocalSearch] = useState(search?.value || "");

  useEffect(() => {
    setLocalSearch(search?.value || "");
  }, [search?.value]);

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
