import Link from "next/link";
import { ROUTES } from "@/presentation/config/routes";
import { Button } from "./Button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  description?: string;
  backHref?: string;
  backText?: string;
  showBackButton?: boolean;
}

export const ErrorState = ({
  message = "No se pudo cargar la entrada",
  description = "Es posible que el enlace esté roto o que no tengas permisos.",
  backHref = ROUTES.DASHBOARD,
  backText = "Volver al panel",
  showBackButton = true,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center text-card-foreground shadow-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100/50 dark:bg-red-900/20">
        <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{message}</h3>
      <p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {showBackButton && (
        <Link href={backHref}>
          <Button variant="outline">{backText}</Button>
        </Link>
      )}
    </div>
  );
};
