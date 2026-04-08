import React from "react";

interface MetricCardProps {
  value: number | undefined;
  label: string;
}

export const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="flex flex-col items-start gap-2 bg-primary/10 p-4 rounded-lg border border-white/10 backdrop-blur-sm shadow-sm">
      <div className="flex w-full justify-between items-start">
        <p className="text-sm">{label}</p>
        <p className="text-sm">{label}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">{value ?? "-"}</h2>
      </div>
    </div>
  );
};
