import React from "react";

interface MetricCardProps {
  value: string | number | undefined;
  label: string;
}

export const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-3xl font-bold">{value ?? '-'}</h2>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
