"use client";

import Link from "next/link";
import { Button } from "../../ui/Button";
import { useDashboardTable } from "./useDashboardTable";

const DashboardTable = () => {
  const { data, isLoading, error } = useDashboardTable();
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <Link href="/posts/new">
        <Button variant="primary">Create Post</Button>
      </Link>
    </div>
  );
};

export default DashboardTable;
