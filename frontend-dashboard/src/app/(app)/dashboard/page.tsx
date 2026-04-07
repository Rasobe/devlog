import { DashboardPostsTable } from "@/presentation/components/features";
import { Button } from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your posts</p>
        </div>
        <Link href={ROUTES.POSTS_NEW}>
          <Button variant="primary">Create Post</Button>
        </Link>
      </div>

      <DashboardPostsTable />
    </div>
  );
};

export default DashboardPage;
