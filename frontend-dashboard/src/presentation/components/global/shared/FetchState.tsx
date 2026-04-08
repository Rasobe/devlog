interface FetchStateProps {
  message?: string;
}

export const FetchState = ({
  message = "Cargando datos...",
}: FetchStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {message}
      </p>
    </div>
  );
};
