import Link from "next/link";
import { ROUTES } from "@/presentation/config/routes";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <FileQuestion className="w-16 h-16 text-muted-foreground" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Página no encontrada</h1>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido eliminada.
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
