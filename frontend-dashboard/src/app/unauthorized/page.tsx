import Link from "next/link";
import { ROUTES } from "@/presentation/config/routes";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <ShieldX className="w-16 h-16 text-red-500" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Acceso denegado</h1>
        <p className="text-muted-foreground">
          No tienes permisos para acceder a esta página.
        </p>
      </div>
      <Link
        href={ROUTES.DASHBOARD}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Volver al dashboard
      </Link>
    </div>
  );
}
