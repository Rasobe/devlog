import { QuickAccessCard } from "./_components";
import { FileText, PenLine, Settings, BarChart2 } from "lucide-react";
import { ROUTES } from "@/presentation/config/routes";

export const QuickAccessSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Accede rápidamente a las funcionalidades más utilizadas
      </h2>

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
