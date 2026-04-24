import { FileText, FolderOpen, LayoutDashboard, Tags } from "lucide-react";
import { AppRoute, ROUTES } from "./routes";
import { UserRole } from "@/domain/models";

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
  roles?: UserRole[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    label: "Panel de Control",
    icon: LayoutDashboard,
    roles: [UserRole.ADMIN, UserRole.AUTHOR],
  },
  {
    href: ROUTES.POSTS,
    label: "Mis Publicaciones",
    icon: FileText,
    roles: [UserRole.AUTHOR],
  },
  {
    href: ROUTES.CATEGORIES,
    label: "Categorías",
    icon: FolderOpen,
    roles: [UserRole.ADMIN],
  },
  {
    href: ROUTES.TAGS,
    label: "Etiquetas",
    icon: Tags,
    roles: [UserRole.ADMIN],
  },
];
