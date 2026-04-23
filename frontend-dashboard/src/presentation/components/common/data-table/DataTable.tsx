"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/core/utils";
import { TextField } from "../text-field";
import { Skeleton } from "../Skeleton";
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
  rowKey: (item: T) => string | number;
  search?: DataTableSearch;
  filters?: DataTableFilter[];
  pagination: DataTablePagination;
  isLoading?: boolean;
  emptyMessage?: string;
}

const SKELETON_ROW_COUNT = 5;

interface TableToolbarProps {
  search?: DataTableSearch;
  filters?: DataTableFilter[];
  isLoading?: boolean;
  localSearch: string;
  onLocalSearchChange: (value: string) => void;
}

const TableToolbar = ({
  search,
  filters,
  isLoading,
  localSearch,
  onLocalSearchChange,
}: TableToolbarProps) => {
  if (search == null && !filters?.length) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {search != null && (
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10"
            aria-hidden="true"
          />
          <TextField
            value={localSearch}
            onChange={(e) => onLocalSearchChange(e.target.value)}
            placeholder={search.placeholder ?? "Buscar..."}
            className="pl-10 h-10!"
            disabled={isLoading}
            aria-label={search.placeholder ?? "Buscar"}
          />
        </div>
      )}
      {filters?.map((filter) => (
        <div key={filter.key}>{filter.render()}</div>
      ))}
    </div>
  );
};

interface TableHeaderProps<T> {
  columns: DataTableColumn<T>[];
}

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => (
  <thead>
    <tr className="bg-muted/80">
      {columns.map((column) => (
        <th key={column.key} scope="col" className="text-left text-sm font-medium px-4 py-3">
          {column.header}
        </th>
      ))}
    </tr>
  </thead>
);

interface TableBodyProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (item: T) => string | number;
  isLoading: boolean;
  emptyMessage: string;
}

const TableBody = <T,>({ data, columns, rowKey, isLoading, emptyMessage }: TableBodyProps<T>) => {
  if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
          <tr key={`skeleton-row-${i}`} className="border-t border-border">
            {columns.map((column) => (
              <td key={`skeleton-col-${column.key}`} className="px-4 py-3">
                <Skeleton className="h-5 w-full rounded" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="text-center text-sm py-8 text-muted-foreground">
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={rowKey(item)} className="border-t border-border hover:bg-muted/30 transition-colors">
          {columns.map((column) => (
            <td key={column.key} className="px-4 py-3 text-sm">
              {column.render(item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({ currentPage, totalPages, onPageChange }: TablePaginationProps) => {
  if (totalPages <= 1) return null;

  const paginationButtonClass = cn(
    "p-1 rounded transition-colors hover:bg-muted",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  );

  return (
    <nav aria-label="Paginación de la tabla" className="flex flex-row items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        aria-label="Página anterior"
        className={paginationButtonClass}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      <span className="text-sm tabular-nums">
        Página {currentPage + 1} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        aria-label="Página siguiente"
        className={paginationButtonClass}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
};

export const DataTable = <T,>({
  data,
  columns,
  rowKey,
  search,
  filters,
  pagination,
  isLoading = false,
  emptyMessage = "No hay datos",
}: DataTableProps<T>) => {
  const { currentPage, totalPages, onPageChange } = pagination;
  const { localSearch, setLocalSearch } = useDataTable({ search });

  return (
    <div className="flex flex-col gap-3">
      <TableToolbar
        search={search}
        filters={filters}
        isLoading={isLoading}
        localSearch={localSearch}
        onLocalSearchChange={setLocalSearch}
      />

      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse">
          <TableHeader columns={columns} />
          <TableBody
            data={data}
            columns={columns}
            rowKey={rowKey}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
