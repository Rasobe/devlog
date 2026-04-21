import { AppRoute } from "@/presentation/config/routes";
import { usePathname } from "next/navigation";

export const useNavLink = () => {
  const pathname = usePathname();

  const isSelected = (href: AppRoute) => {
    return pathname === href;
  };

  return { isSelected };
};
