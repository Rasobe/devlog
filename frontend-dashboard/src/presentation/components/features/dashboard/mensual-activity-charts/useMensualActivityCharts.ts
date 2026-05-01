import { getUserActivityUseCase, queryKeys } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useMensualActivityCharts = () => {
  const [periodValue, setPeriodValue] = useState<string>("last_6_months");
  const [period, setPeriod] = useState<number>(6);

  const {
    data: monthlyActivity,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.user.activity(period),
    queryFn: () => getUserActivityUseCase.execute(period),
  });

  const handlePeriodChange = (option: string) => {
    const map: Record<string, number> = {
      last_1_month: 1,
      last_3_months: 3,
      last_6_months: 6,
      last_12_months: 12,
    };
    setPeriodValue(option);
    setPeriod(map[option] ?? 6);
  };

  const max =
    monthlyActivity && monthlyActivity.length > 0
      ? Math.max(...monthlyActivity.map((a) => a.totalPosts))
      : 1;

  return {
    monthlyActivity,
    max,
    period,
    periodValue,
    isLoading,
    error,
    handlePeriodChange,
  };
};
