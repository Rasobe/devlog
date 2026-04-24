import { FileText, FolderOpen, LayoutDashboard, Tags } from "lucide-react";
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
    icon: LayoutDashboard,
  },
  {
    href: ROUTES.POSTS,
    label: "Mis Publicaciones",
    icon: FileText,
  },
  {
    href: ROUTES.CATEGORIES,
    label: "Categorías",
    icon: FolderOpen,
  },
  {
    href: ROUTES.TAGS,
    label: "Etiquetas",
    icon: Tags,
  },
];
