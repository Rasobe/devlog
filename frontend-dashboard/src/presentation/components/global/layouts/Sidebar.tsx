"use client";

import { ROUTES } from "@/presentation/config/routes";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "../primitives";
import { NAV_ITEMS } from "@/presentation/config/navigation";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { LogOut, Plus } from "lucide-react";

export const Sidebar = () => {
  const { logout, user } = useAuthContext();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-card shrink-0 border-r p-4 flex flex-col">
      {/* Logo + Company Name */}
      <div className="flex items-start gap-2">
        <Link
          href={ROUTES.DASHBOARD}
          className="flex items-center gap-1 text-lg font-medium tracking-tight text-foreground hover:text-primary-hover transition-colors"
        >
          <Image
            src="/favicon-32x32.png"
            alt="Favicon"
            width={32}
            height={32}
          />
          <span>DevLog</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-slim pr-2">
        <ul className="space-y-2">
          <NavLink
            href={ROUTES.POSTS_NEW}
            icon={<Plus />}
            label={"Nueva Publicación"}
            variant={"success"}
          />

          <div className="h-px bg-border my-4" />

          {NAV_ITEMS.map(({ href, icon: Icon, label, variant }) => (
            <li key={href}>
              <NavLink
                href={href}
                icon={<Icon />}
                label={label}
                variant={variant}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">
              {user?.displayName}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </footer>
    </aside>
  );
};
