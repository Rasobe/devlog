import { Button } from "@/presentation/components/common";
import { ROUTES } from "@/presentation/config/routes";
import { Plus } from "lucide-react";
import Link from "next/link";

export const PostsHeader = () => {
  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Publicaciones</h1>
        <p className="text-muted-foreground">
          Gestiona y organiza todos tus artículos de blog
        </p>
      </div>
      <Link href={ROUTES.POSTS_NEW}>
        <Button variant="gradient">
          <Plus size={16} />
          Crear Publicación
        </Button>
      </Link>
    </div>
  );
};
