import { cn } from "@/core/utils";
import { Button } from "@/presentation/components/common";
import { ROUTES } from "@/presentation/config/routes";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader = ({
  isCollapsed,
  toggleSidebar,
}: SidebarHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center h-[32px]",
        isCollapsed ? "justify-center gap-0" : "justify-between gap-2",
      )}
    >
      <Link
        href={ROUTES.DASHBOARD}
        className={cn(
          "flex items-center gap-2 text-lg font-medium tracking-tight text-foreground hover:text-primary-hover transition-all duration-500 overflow-hidden whitespace-nowrap",
          isCollapsed
            ? "max-w-0 opacity-0 pointer-events-none"
            : "max-w-[120px] opacity-100",
        )}
      >
        <Image
          src="/favicon-32x32.png"
          alt="Favicon"
          width={32}
          height={32}
          className="shrink-0"
        />
        <span>DevLog</span>
      </Link>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        onClick={toggleSidebar}
        className="p-2 shrink-0 transition-transform duration-300"
      >
        {isCollapsed ? (
          <PanelLeftOpen size={16} strokeWidth={1.5} />
        ) : (
          <PanelLeftClose size={16} strokeWidth={1.5} />
        )}
      </Button>
    </div>
  );
};
