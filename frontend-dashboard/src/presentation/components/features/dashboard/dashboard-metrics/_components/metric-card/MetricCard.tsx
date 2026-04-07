import React from "react";

interface MetricCardProps {
  value: string | number | undefined;
  label: string;
}

export const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="flex flex-col items-center p-8 border rounded-lg gap-2">
      <h2 className="text-4xl font-bold">{value ?? '-'}</h2>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
