import {
  DashboardMetrics,
  DashboardHeader,
  QuickAccessSection,
} from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
};

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />
      <DashboardMetrics />
      <QuickAccessSection />
    </div>
  );
};

export default page;
