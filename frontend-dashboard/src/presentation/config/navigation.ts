import { BookOpen, Home } from "lucide-react";
import { AppRoute, ROUTES } from "./routes";

export type NavLinkVariant =
  | "default"
  | "current"
  | "primary"
  | "outline"
  | "success";

export interface NavItem {
  href: AppRoute;
  label: string;
  icon: React.ElementType;
  variant?: NavLinkVariant;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    label: "Panel de Control",
    icon: Home,
  },
  {
    href: ROUTES.POSTS,
    label: "Mis Publicaciones",
    icon: BookOpen,
  },
];
