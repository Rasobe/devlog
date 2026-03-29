"use client";

import { useDashboardTable } from "./useDashboardTable";

const DashboardTable = () => {
  const { data, isLoading, error } = useDashboardTable();
  return <div>{JSON.stringify(data)}</div>;
};

export default DashboardTable;
