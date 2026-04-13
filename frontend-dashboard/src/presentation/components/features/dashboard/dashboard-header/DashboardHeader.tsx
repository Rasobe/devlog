"use client"

import { useAuthContext } from "@/presentation/store/AuthContext";

export const DashboardHeader = () => {
  const { user } = useAuthContext();

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
