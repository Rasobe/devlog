import {
  DashboardMetrics,
  DashboardHeader,
  QuickAccessSection,
} from "@/presentation/components/features";

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
