import {
  DashboardMetrics,
  DashboardHeader,
} from "@/presentation/components/features";

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardMetrics />
    </div>
  );
};

export default page;
