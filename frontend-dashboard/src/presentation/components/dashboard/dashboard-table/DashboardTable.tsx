"use client";

import { useDashboardTable } from "./useDashboardTable";

const DashboardTable = () => {
  const { data, isLoading, error } = useDashboardTable();
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <button type="button">Create Post</button>
    </div>
  );
};

export default DashboardTable;
