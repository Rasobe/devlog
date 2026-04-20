import { QueryProvider } from "@/presentation/store/QueryProvider";
import { AuthProvider } from "@/presentation/store/AuthContext";
import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Toaster } from "@/presentation/components/global";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | DevLog", // %s se reemplaza por el título de cada página
    default: "DevLog",
  },
  description: "DevLog Admin Dashboard",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
