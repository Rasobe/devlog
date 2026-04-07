import { AppRoute } from "@/presentation/config/routes";
import { cn } from "@/core/utils/cn";
import Link from "next/link";
import React from "react";

type ColorBase =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "muted";

// Mapa estático — Tailwind necesita clases completas, no interpoladas
const colorMap: Record<ColorBase, { card: string; icon: string }> = {
  primary: {
    card: "bg-blue-50 border-blue-200 dark:bg-blue-950/70 dark:border-blue-800/50",
    icon: "bg-blue-600 text-white",
  },
  accent: {
    card: "bg-green-50 border-green-200 dark:bg-green-950/70 dark:border-green-800/50",
    icon: "bg-green-600 text-white",
  },
  secondary: {
    card: "bg-amber-50 border-amber-200 dark:bg-amber-950/70 dark:border-amber-800/50",
    icon: "bg-amber-600 text-white",
  },
  warning: {
    card: "bg-gray-50 border-gray-200 dark:bg-gray-900/70 dark:border-gray-700/50",
    icon: "bg-gray-500 text-white",
  },
  destructive: {
    card: "bg-red-50 border-red-200 dark:bg-red-950/70 dark:border-red-800/50",
    icon: "bg-red-600 text-white",
  },
  success: {
    card: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/70 dark:border-emerald-800/50",
    icon: "bg-emerald-600 text-white",
  },
  info: {
    card: "bg-cyan-50 border-cyan-200 dark:bg-cyan-950/70 dark:border-cyan-800/50",
    icon: "bg-cyan-600 text-white",
  },
  muted: {
    card: "bg-muted border-border",
    icon: "bg-muted-foreground text-background",
  },
};

interface QuickAccessCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  colorBase?: ColorBase;
  href?: AppRoute;
  badge?: string;
  disabled?: boolean;
}

export const QuickAccessCard = ({
  icon,
  label,
  description,
  colorBase = "muted",
  href,
  badge,
  disabled,
}: QuickAccessCardProps) => {
  const Wrapper = href && !disabled ? Link : "div";
  const colors = colorMap[colorBase];

  return (
    <Wrapper
      href={href ?? "#"}
      className={cn(
        "flex flex-col gap-3 items-start p-5 rounded-2xl border transition-all duration-200",
        colors.card,
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:brightness-95 hover:-translate-y-0.5",
      )}
    >
      <div className={cn("p-2.5 rounded-lg", colors.icon)}>
        {React.cloneElement(icon as React.ReactElement)}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {badge ? (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border w-fit">
            {badge}
          </span>
        ) : (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </Wrapper>
  );
};
