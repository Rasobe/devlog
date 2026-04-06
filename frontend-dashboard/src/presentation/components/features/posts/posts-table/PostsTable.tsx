import { Post } from "@/domain/models/post.model";
import { ROUTES } from "@/presentation/config/routes";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface PostsTableProps {
  posts: Post[];
  onDelete: (slug: string) => void;
}

export const PostsTable = ({ posts, onDelete }: PostsTableProps) => {
  const formattedDate = (date: Date) =>
    new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Título
            </th>
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Estado
            </th>
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Fecha
            </th>
            <th className="text-right text-sm text-muted-foreground font-medium px-4 py-3">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr
              key={post.slug}
              className="hover:bg-muted/50 transition-colors border-t border-border"
            >
              <td className="px-4 py-3 text-sm font-medium text-foreground">
                {post.title}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.published
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {post.published ? "Publicado" : "Borrador"}
                </span>
              </td>

              <td className="px-4 py-3 text-sm text-muted-foreground">
                {formattedDate(post.createdAt)}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link href={ROUTES.POSTS_EDIT(post.slug)}>
                    <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil size={15} />
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(post.slug)}
                    className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
