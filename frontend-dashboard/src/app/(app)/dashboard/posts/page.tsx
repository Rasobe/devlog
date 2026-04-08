import { PostsContent } from "@/presentation/components/features";
import { Button } from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publicaciones",
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your posts</p>
        </div>
        <Link href={ROUTES.POSTS_NEW}>
          <Button variant="primary">
            Crear Publicación
          </Button>
        </Link>
      </div>
      <PostsContent />
    </div>
  );
};

export default DashboardPage;
