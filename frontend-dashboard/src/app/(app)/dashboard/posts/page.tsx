import { 
  PostsHeader, 
  PostsMetrics, 
  PostsContent 
} from "@/presentation/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicaciones",
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PostsHeader />
      <PostsMetrics />
      <PostsContent />
    </div>
  );
};

export default DashboardPage;
