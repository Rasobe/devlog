import React from "react";
import { cn } from "@/core/utils/cn";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

/* ─── Variant config ─── */
const variants = {
  edit: {
    icon: Pencil,
    className:
      "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
  delete: {
    icon: Trash2,
    className:
      "text-muted-foreground hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400",
  },
  view: {
    icon: Eye,
    className:
      "text-muted-foreground hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400",
  },
} as const;

export type TableActionVariant = keyof typeof variants;

/* ─── Single Action Button ─── */
interface TableActionBtnProps {
  variant: TableActionVariant;
  href?: string;
  onClick?: () => void;
  size?: number;
  className?: string;
  title?: string;
}

export const TableActionBtn = ({
  variant,
  href,
  onClick,
  size = 15,
  className,
  title,
}: TableActionBtnProps) => {
  const config = variants[variant];
  const Icon = config.icon;

  const btn = (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "p-2 rounded-md transition-colors cursor-pointer",
        config.className,
        className
      )}
    >
      <Icon size={size} />
    </button>
  );

  if (href) {
    return <Link href={href}>{btn}</Link>;
  }

  return btn;
};

/* ─── Actions Container ─── */
interface TableActionsProps {
  children: React.ReactNode;
  className?: string;
}

export const TableActions = ({ children, className }: TableActionsProps) => (
  <div className={cn("flex items-center justify-end gap-1", className)}>
    {children}
  </div>
);
