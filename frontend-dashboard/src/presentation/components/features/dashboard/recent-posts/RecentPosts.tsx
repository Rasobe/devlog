"use client";

import { formatShortDate } from "@/core/utils";
import { useRecentPosts } from "./useRecentPosts";
import { Badge } from "@/presentation/components/global";

export const RecentPosts = () => {
  const { posts, isLoading, error } = useRecentPosts();

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/80">
            <th className="text-left text-sm font-medium p-4">Estado</th>
            <th className="text-left text-sm font-medium p-4">Titulo</th>
            <th className="text-left text-sm font-medium p-4">Creado</th>
            <th className="text-left text-sm font-medium p-4">Extracto</th>
            <th className="text-left text-sm font-medium p-4">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {posts?.map((post) => (
            <tr key={post.slug} className="border-t border-border hover:bg-muted/50 transition-colors">
              <td className="p-4 text-sm">
                <Badge variant={post.published ? "success" : "warning"}>
                  {post.published ? "Publicado" : "Borrador"}
                </Badge>
              </td>
              <td className="p-4 text-sm truncate max-w-xs">{post.title}</td>
              <td className="p-4 text-sm">{formatShortDate(post.createdAt)}</td>
              <td className="p-4 text-sm truncate max-w-xs">{post.excerpt}</td>
              <td className="p-4 text-sm"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
