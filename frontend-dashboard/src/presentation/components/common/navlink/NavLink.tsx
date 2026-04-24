"use client";

import { cn } from "@/core/utils/cn";
import { AppRoute } from "@/presentation/config/routes";
import Link from "next/link";
import React from "react";
import { useNavLink } from "./useNavLink";
import { NavLinkVariant } from "@/presentation/config/navigation";
import { UserRole } from "@/domain/models";
import { useAuth } from "@/presentation/hooks/useAuth";

const variantClasses: Record<NavLinkVariant, string> = {
  current: "bg-muted text-foreground font-medium",
  default: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
  primary: "bg-primary text-primary-foreground",
  outline: "border border-input bg-transparent",
  success: "bg-green-600 text-green-foreground hover:bg-green-500",
};

interface NavLinkProps {
  href: AppRoute;
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  variant?: NavLinkVariant;
  isCollapsed?: boolean;
  roles?: UserRole[];
}

export const NavLink = ({
  href,
  icon,
  label,
  badge,
  variant = "default",
  isCollapsed = false,
  roles = [],
}: NavLinkProps) => {
  const { isSelected } = useNavLink();
  const current = isSelected(href);
  const variantClass = current ? "current" : "default";

  const { user } = useAuth();

  if (!user?.role) return null;

  const isVisible = roles.length === 0 || roles.includes(user.role);

  if (!isVisible) return null;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center py-2 px-4 rounded-md transition-all duration-300",
        isCollapsed ? "justify-center px-2 gap-0" : "gap-2",
        variantClasses[variant === "default" ? variantClass : variant],
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className="shrink-0">{icon}</div>
      <span
        className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100",
        )}
      >
        {label}
      </span>
      {badge && (
        <span
          className={cn(
            "ml-auto text-xs bg-muted rounded-full transition-all duration-300 overflow-hidden whitespace-nowrap flex items-center justify-center",
            isCollapsed
              ? "max-w-0 opacity-0 px-0 py-0"
              : "max-w-[40px] opacity-100 px-1.5 py-0.5",
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};
