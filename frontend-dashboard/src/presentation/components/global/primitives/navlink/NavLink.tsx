"use client";

import { cn } from "@/core/utils/cn";
import { AppRoute } from "@/presentation/config/routes";
import Link from "next/link";
import React from "react";
import { useNavLink } from "./useNavLink";
import { NavLinkVariant } from "@/presentation/config/navigation";

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
}

export const NavLink = ({
  href,
  icon,
  label,
  badge,
  variant = "default",
}: NavLinkProps) => {
  const { isSelected } = useNavLink();

  const current = isSelected(href);

  const variantClass = current ? "current" : "default";

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 py-2 px-4 rounded-md",
        "transition-colors",
        variantClasses[variant != "default" ? variant : variantClass],
      )}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};
