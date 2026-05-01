"use client";

import { Select, SelectOption } from "@/presentation/components/common";
import { useMensualActivityCharts } from "./useMensualActivityCharts";
import {
  ActivityBarSkeleton,
  ActivityErrorState,
  MonthlyActivityBar,
} from "./_components";

const MENSUAL_ACTIVITY_OPTIONS: SelectOption[] = [
  { label: "Últimos 12 meses", value: "last_12_months" },
  { label: "Últimos 6 meses", value: "last_6_months" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Último mes", value: "last_1_month" },
];

// Cada fila mide ~24px (h-1.5 + padding + gap). Se usa para fijar la altura
// mínima del contenedor y evitar layout shifts al cambiar el periodo.
const ROW_HEIGHT_PX = 24;

export const MensualActivityCharts = () => {
  const {
    monthlyActivity,
    max,
    period,
    periodValue,
    isLoading,
    error,
    handlePeriodChange,
  } = useMensualActivityCharts();

  return (
    <div className="card flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-1">
        <h2 className="text-lg font-semibold">Actividad Mensual</h2>
        <Select
          options={MENSUAL_ACTIVITY_OPTIONS}
          value={periodValue}
          onChange={handlePeriodChange}
        />
      </div>

      <div
        className="flex flex-col gap-1 transition-all duration-300"
        style={{ minHeight: period * ROW_HEIGHT_PX }}
      >
        {isLoading && <ActivityBarSkeleton rows={period} />}

        {error && !isLoading && <ActivityErrorState />}

        {!isLoading &&
          !error &&
          monthlyActivity?.map((activity) => (
            <MonthlyActivityBar
              key={activity.month}
              monthlyActivity={activity}
              max={max}
            />
          ))}
      </div>
    </div>
  );
};

