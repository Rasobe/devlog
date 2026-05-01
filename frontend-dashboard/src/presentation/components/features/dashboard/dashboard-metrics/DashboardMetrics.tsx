"use client";

import { ErrorState, MetricCard } from "@/presentation/components/common";
import { useDashboardMetrics } from "./useDashboardMetrics";
import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";
import { CheckCircle2, FileText, ChartColumn, Album } from "lucide-react";

export const DashboardMetrics = () => {
  const {
    totalPosts,
    totalPublishedPosts,
    totalDraftPosts,
    totalViews,
    isLoading,
    error,
  } = useDashboardMetrics();

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        value={totalPosts}
        label="Mis Posts"
        icon={<Album className="text-blue-500" />}
      />
      <MetricCard
        value={totalPublishedPosts}
        label="Publicados"
        icon={<CheckCircle2 className="text-emerald-500" />}
      />
      <MetricCard
        value={totalDraftPosts}
        label="Borradores"
        icon={<FileText className="text-amber-500" />}
      />
      <MetricCard
        value={totalViews}
        label="Vistas Totales"
        icon={<ChartColumn className="text-indigo-500" />}
      />
    </div>
  );
};
