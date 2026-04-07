import { QuickAccessCard } from "./_components";
import { FileText, PenLine, Settings, BarChart2 } from "lucide-react";
import { ROUTES } from "@/presentation/config/routes";

export const QuickAccessSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="uppercase font-medium text-sm">Acceso Rápido</h3>
        <p className="text-muted-foreground">
          Accede rápidamente a las funcionalidades más utilizadas
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAccessCard
          icon={<FileText />}
          label={"Posts"}
          description={"Gestiona tus publicaciones"}
          href={ROUTES.POSTS}
          colorBase="primary"
        />
        <QuickAccessCard
          icon={<PenLine />}
          label={"Nueva publicación"}
          description={"Escribe algo nuevo"}
          href={ROUTES.POSTS_NEW}
          colorBase="accent"
        />
        <QuickAccessCard
          icon={<Settings />}
          label={"Configuración"}
          description={"Ajustes del blog"}
          href={ROUTES.SETTINGS}
          colorBase="secondary"
        />
        <QuickAccessCard
          icon={<BarChart2 />}
          label={"Estadísticas"}
          description={"Revisa la actividad del blog"}
          badge="Próximamente"
          disabled
          colorBase="warning"
        />
      </div>
    </div>
  );
};
