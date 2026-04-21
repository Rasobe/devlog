import Link from "next/link";
import { Button } from "../primitives/Button";

export interface FetchStateCardProps {
  isLoading: boolean;
  hasError: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  errorDetail?: string;
  retryHref?: string;
  retryText?: string;
}

export const FetchStateCard = ({
  isLoading,
  hasError,
  loadingMessage = "Cargando datos...",
  errorMessage = "Ocurrió un error inesperado",
  errorDetail = "Por favor intenta de nuevo más tarde.",
  retryHref = "/dashboard",
  retryText = "Volver al panel",
}: FetchStateCardProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          {loadingMessage}
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100/50 dark:bg-red-900/20">
          <svg
            className="h-7 w-7 text-red-600 dark:text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{errorMessage}</h3>
        <p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">
          {errorDetail}
        </p>
        <Link href={retryHref}>
          <Button variant="outline">{retryText}</Button>
        </Link>
      </div>
    );
  }

  return null;
};
