"use client";

import { Select, SelectOption } from "@/presentation/components/common";

const MENSUAL_ACTIVITY_OPTIONS: SelectOption[] = [
  { label: "Últimos 12 meses", value: "last_12_months" },
  { label: "Últimos 6 meses", value: "last_6_months" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Último mes", value: "last_1_month" },
];

export const MensualActivityCharts = () => {
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-1">
        <h2 className="text-lg font-semibold">Actividad Mensual</h2>
        <Select options={MENSUAL_ACTIVITY_OPTIONS} onChange={() => {}} />
      </div>

      {/* TODO: Implementar datos reales y gráficos */}
      <div className="flex flex-col gap-1">{}</div>
    </div>
  );
};
