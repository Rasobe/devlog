import {
  DashboardMetrics,
  DashboardHeader,
  QuickAccessSection,
  MensualActivityCharts,
  PostsByCategorySection,
} from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />
      <DashboardMetrics />
      <div className="grid grid-cols-2 gap-2">
        <MensualActivityCharts />
        <PostsByCategorySection />
      </div>
      <QuickAccessSection />
    </div>
  );
};

export default DashboardPage;
