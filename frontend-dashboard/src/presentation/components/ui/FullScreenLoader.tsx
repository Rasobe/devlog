export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="relative flex flex-col items-center animate-in fade-in duration-500">
        {/* Glow behind the logo */}
        <div className="absolute -inset-6 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

        {/* Brand Text */}
        <h1 className="relative text-5xl font-extrabold tracking-tighter bg-linear-to-br from-blue-400 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
          DevLog
        </h1>

        {/* Minimalist Spinner */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-y-2 border-r-2 border-blue-500 border-l-transparent" />
          <span className="text-sm font-medium text-muted-foreground animate-pulse">
            Iniciando entorno...
          </span>
        </div>
      </div>
    </div>
  );
}
