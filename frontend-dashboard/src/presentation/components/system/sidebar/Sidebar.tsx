"use client";

import { cn } from "@/core/utils";
import { useSidebar } from "@/presentation/hooks/useSidebar";
import { SidebarFooter, SidebarHeader, SidebarNav } from "./_components";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "w-64 h-screen bg-card shrink-0 border-r p-4 flex flex-col transition-all duration-300 ease-in-out sticky top-0",
        isCollapsed && "w-20",
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarNav isCollapsed={isCollapsed} />
      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
};
