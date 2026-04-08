import { Sidebar } from "@/presentation/components/global";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <div className="min-h-screen flex flex-row bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <div
          className="
          mx-auto
          max-w-5xl
          px-4 md:px-6 lg:px-8
          py-6 md:py-10
        "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
