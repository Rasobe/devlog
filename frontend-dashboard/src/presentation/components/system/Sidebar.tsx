"use client";

import { ROUTES } from "@/presentation/config/routes";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/presentation/config/navigation";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { LogOut, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { useSidebar } from "@/presentation/hooks/useSidebar";
import { cn } from "@/core/utils";
import { Button, NavLink, Divider } from "../common";

export const Sidebar = () => {
  const { logout, user } = useAuthContext();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "w-64 h-screen bg-card shrink-0 border-r p-4 flex flex-col transition-all duration-300 ease-in-out sticky top-0",
        isCollapsed && "w-20",
      )}
    >
      {/* Logo + Toggle */}
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

      {/* Navigation */}
      <nav className="mt-6 flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-slim pr-2">
        <ul className="space-y-2">
          <li>
            <NavLink
              href={ROUTES.POSTS_NEW}
              icon={<Plus size={18} strokeWidth={1.5} />}
              label={"Nueva Publicación"}
              variant={"success"}
              isCollapsed={isCollapsed}
            />
          </li>

          <Divider />

          {NAV_ITEMS.map(({ href, icon: Icon, label, variant }) => (
            <li key={href}>
              <NavLink
                href={href}
                icon={<Icon size={18} strokeWidth={1.5} />}
                label={label}
                variant={variant}
                isCollapsed={isCollapsed}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="border-t border-border pt-4">
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center gap-0" : "justify-between gap-2",
          )}
        >
          <div
            className={cn(
              "flex flex-col min-w-0 transition-all duration-500 overflow-hidden whitespace-nowrap",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100",
            )}
          >
            <span className="text-sm font-medium text-foreground truncate block">
              {user?.displayName}
            </span>
            <span className="text-xs text-muted-foreground truncate block">
              {user?.email}
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="p-2 shrink-0"
            title="Cerrar sesión"
          >
            <LogOut size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </footer>
    </aside>
  );
};
