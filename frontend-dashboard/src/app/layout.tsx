import { QueryProvider } from "@/presentation/store/QueryProvider";
import { AuthProvider } from "@/presentation/store/auth-context/AuthContext";
import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DevLog Dashboard",
  description: "Admin dashboard for DevLog",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
