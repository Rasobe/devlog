"use client";

import { ErrorState, MetricCard } from "@/presentation/components/global";
import { useDashboardMetrics } from "./useDashboardMetrics";
import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";
import { CheckCircle2, FileText, ChartColumn } from "lucide-react";

export const DashboardMetrics = () => {
  const { totalPublishedPosts, totalDraftPosts, totalViews, isLoading, error } =
    useDashboardMetrics();

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
        value={totalPublishedPosts}
        label="Publicados"
        icon={<CheckCircle2 className="text-emerald-500" />}
      />
      <MetricCard
        value={totalDraftPosts}
        label="Borradores en Curso"
        icon={<FileText className="text-amber-500" />}
      />
      <MetricCard
        value={totalViews}
        label="Vistas Totales"
        icon={<ChartColumn className="text-indigo-500" />}
      >
        <div className="flex items-end gap-1 opacity-80">
          <div className="w-2 bg-primary/80 rounded-t-sm h-3" />
          <div className="w-2 bg-primary/80 rounded-t-sm h-6" />
          <div className="w-2 bg-primary/80 rounded-t-sm h-4" />
          <div className="w-2 bg-primary/80 rounded-t-sm h-7" />
        </div>
      </MetricCard>
    </div>
  );
};
