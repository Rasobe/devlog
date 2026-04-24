import { cn } from "@/core/utils";
import { Button } from "@/presentation/components/common";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { LogOut } from "lucide-react";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export const SidebarFooter = ({ isCollapsed }: SidebarFooterProps) => {
  const { logout, user } = useAuthContext();

  return (
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
  );
};
