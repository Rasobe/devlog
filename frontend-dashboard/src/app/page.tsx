import { redirect } from "next/navigation";
import { ROUTES } from "@/presentation/config/routes";

export default function RootPage() {
  redirect(ROUTES.DASHBOARD);
}
