"use client";

import { ErrorState } from "@/presentation/components/global";
import { MetricCard } from "./_components";
import { useDashboardMetrics } from "./useDashboardMetrics";
import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";
import { Album, ChartColumn, NotepadText } from "lucide-react";

export const DashboardMetrics = () => {
  const { published, drafts, isLoading, error } = useDashboardMetrics();

  if (isLoading) return <DashboardMetricsSkeleton />;
  if (error)
    return (
      <ErrorState
        message="Error al cargar las métricas"
        description="Ha habido un error al cargar las métricas"
        showBackButton={false}
      />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        value={published}
        label="Publicaciones Totales"
        icon={<Album />}
      />
      <MetricCard
        value={drafts}
        label="Borradores en Curso"
        icon={<NotepadText />}
      />
      <MetricCard
        value={drafts}
        label="Vistas Recientes (7 días)"
        icon={<ChartColumn />}
      />
    </div>
  );
};
