"use client";

import { ErrorState } from "@/presentation/components/global";
import { MetricCard } from "./_components";
import { useDashboardMetrics } from "./useDashboardMetrics";
import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";

export const DashboardMetrics = () => {
  const { published, drafts, lasPostDate, isLoading, error } =
    useDashboardMetrics();

  if (isLoading) return <DashboardMetricsSkeleton />;
  if (error)
    return (
      <ErrorState
        message="Error al cargar las métricas"
        description="Ha habido un error al cargar las métricas"
      />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-16 px-4 border-y">
      <MetricCard value={published} label="Publicaciones" />
      <MetricCard value={drafts} label="Borradores" />
      <MetricCard value={lasPostDate} label="Última publicación" />
    </div>
  );
};
