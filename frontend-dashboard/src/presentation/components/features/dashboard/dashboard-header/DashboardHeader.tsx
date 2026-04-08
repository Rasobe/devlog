"use client"

import { useAuth } from "@/presentation/hooks/useAuth";

export const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Resumen de Blog:{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">
          {user?.displayName}
        </span>
      </h1>
    </div>
  );
};
