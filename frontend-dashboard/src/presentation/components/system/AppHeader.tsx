"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/presentation/store/AuthContext";
import { ROUTES } from "@/presentation/config/routes";

export const AppHeader = () => {
  const { logout } = useAuthContext();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href={ROUTES.DASHBOARD}
            className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <Image src="/favicon.ico" alt="Favicon" width={40} height={40} />
          </Link>

          <button
            type="button"
            onClick={logout}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};
