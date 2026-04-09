import React from "react";

interface MetricCardProps {
  value: number | undefined;
  label: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const MetricCard = ({
  value,
  label,
  icon,
  children,
}: MetricCardProps) => {
  return (
    <div className="flex flex-col justify-between h-32 bg-linear-to-br from-slate-800/60 to-slate-900/60 transition-all p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden group">
      {/* Un destello azul más brillante y suave dentro de la tarjeta */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Parte Superior: Título e Icono */}
      <div className="flex w-full justify-between items-start relative z-10">
        <p className="text-sm font-medium text-foreground/90 tracking-wide">
          {label}
        </p>
        <div className="text-primary/90">{icon}</div>
      </div>

      {/* Parte Inferior: Valor y Elemento Decorativo (Mini grilla de barras) */}
      <div className="flex w-full justify-between items-end relative z-10">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          {value ?? "-"}
        </h2>

        {children}
      </div>
    </div>
  );
};
