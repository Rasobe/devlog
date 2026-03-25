import { QueryProvider } from "@/store/QueryProvider";
import { AuthProvider } from "@/store/AuthContext";
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
    <html lang="es" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
