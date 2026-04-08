import React from "react";

interface BadgeProps {
  variant: "success" | "warning" | "danger" | "info" | "default";
  children: React.ReactNode;
}

export const Badge = ({ variant, children }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : variant === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : variant === "danger" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : variant === "info" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}
    >
      {children}
    </span>
  );
};
