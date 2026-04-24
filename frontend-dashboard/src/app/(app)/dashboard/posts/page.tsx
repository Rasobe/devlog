import { 
  PostsMetrics, 
  PostsContent 
} from "@/presentation/components/features";
import { PageHeader } from "@/presentation/components/common";
import { ROUTES } from "@/presentation/config/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicaciones",
};

const PostsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Publicaciones"
        description="Gestiona y organiza todos tus artículos de blog"
        action={{
          label: "Crear Publicación",
          href: ROUTES.POSTS_NEW,
          icon: <Plus size={16} />
        }}
      />
      <PostsMetrics />
      <PostsContent />
    </div>
  );
};

export default PostsPage;
