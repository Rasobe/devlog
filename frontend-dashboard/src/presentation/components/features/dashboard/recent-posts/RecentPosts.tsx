"use client";

import { formatShortDate } from "@/core/utils";
import { useRecentPosts } from "./useRecentPosts";
import {
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActions,
  TableActionBtn,
  ErrorState,
  FetchState,
} from "@/presentation/components/global";
import { ROUTES } from "@/presentation/config/routes";

export const RecentPosts = () => {
  const { posts, isLoading, error } = useRecentPosts();

  if (isLoading) {
    return <FetchState />;
  }

  if (error) {
    return <ErrorState showBackButton={false} />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Tus Publicaciones Recientes
      </h2>
      
      <Table>
        <TableHeader>
          <tr className="bg-muted/80">
            <TableHead>Estado</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Extracto (Excerpt)</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </tr>
        </TableHeader>

        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.slug}>
              <TableCell>
                <Badge variant={post.published ? "success" : "warning"}>
                  {post.published ? "Publicado" : "Borrador"}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatShortDate(post.createdAt)}
              </TableCell>
              <TableCell className="truncate max-w-xs text-muted-foreground">
                {post.excerpt}
              </TableCell>
              <TableCell>
                <TableActions>
                  <TableActionBtn
                    variant="view"
                    href={ROUTES.POSTS_EDIT(post.slug)}
                    title="Ver"
                  />
                  <TableActionBtn
                    variant="edit"
                    href={ROUTES.POSTS_EDIT(post.slug)}
                    title="Editar"
                  />
                </TableActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
