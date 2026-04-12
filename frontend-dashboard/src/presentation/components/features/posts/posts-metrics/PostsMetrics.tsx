"use client";

import { Album, ChartColumn, CheckCircle2, FileText } from "lucide-react";
import { MetricCard, Skeleton } from "@/presentation/components/global";
import { usePostsMetrics } from "./usePostsMetrics";

export const PostsMetrics = () => {
  const {
    totalPosts,
    totalPublishedPosts,
    totalDraftPosts,
    totalViews,
    isLoading,
    error,
  } = usePostsMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total de Publicaciones */}
      <MetricCard
        value={totalPosts}
        label="Publicaciones Totales"
        icon={<Album className="text-blue-500" />}
      />

      {/* Publicados */}
      <MetricCard
        value={totalPublishedPosts}
        label="Publicados"
        icon={<CheckCircle2 className="text-emerald-500" />}
      />

      {/* Borradores */}
      <MetricCard
        value={totalDraftPosts}
        label="Borradores"
        icon={<FileText className="text-amber-500" />}
      />

      {/* Vistas Totales con mini-gráfico */}
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
