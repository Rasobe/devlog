"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TextField } from "../../primitives";
import { useDataTable } from "./useDataTable";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
}

export interface DataTablePagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface DataTableSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface DataTableFilter {
  key: string;
  render: () => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  search?: DataTableSearch;
  filters?: DataTableFilter[];
  pagination: DataTablePagination;
  isLoading?: boolean;
}

export const DataTable = <T,>({
  data,
  columns,
  search,
  filters,
  pagination,
  isLoading,
}: DataTableProps<T>) => {
  const { currentPage, totalPages, onPageChange } = pagination;
  const { localSearch, setLocalSearch } = useDataTable({ search });

  return (
    <div className="flex flex-col gap-3">
      {/* Search  */}
      {(search || Boolean(filters?.length)) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {search && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
              <TextField
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={search.placeholder ?? "Buscar..."}
                className="pl-10 h-10!"
              />
            </div>
          )}
          {filters?.map((filter) => (
            <div key={filter.key}>{filter.render()}</div>
          ))}
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse">
          {/* Column Header */}
          <thead>
            <tr className="bg-muted/80">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left text-sm font-medium px-4 py-3"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Data */}
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="border-t border-border hover:bg-muted/30"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm">
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 0}
            className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
