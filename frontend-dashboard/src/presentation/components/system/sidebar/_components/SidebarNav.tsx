import { NavLink, Divider } from "@/presentation/components/common";
import { NAV_ITEMS } from "@/presentation/config/navigation";
import { ROUTES } from "@/presentation/config/routes";
import { Plus } from "lucide-react";

interface SidebarNavProps {
  isCollapsed: boolean;
}

export const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
  return (
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

        {NAV_ITEMS.map(({ href, icon: Icon, label, variant, roles }) => (
          <li key={href}>
            <NavLink
              href={href}
              icon={<Icon size={18} strokeWidth={1.5} />}
              label={label}
              variant={variant}
              isCollapsed={isCollapsed}
              roles={roles}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
