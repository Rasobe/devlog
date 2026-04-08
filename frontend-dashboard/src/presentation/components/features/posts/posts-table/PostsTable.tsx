"use client";

import { formatFullDate } from "@/core/utils";
import { Post } from "@/domain/models/post.model";
import { ROUTES } from "@/presentation/config/routes";
import { usePostTable } from "./usePostTable";
import {
  Badge,
  ConfirmDialog,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActions,
  TableActionBtn,
} from "@/presentation/components/global";

interface PostsTableProps {
  posts: Post[];
}

export const PostsTable = ({ posts }: PostsTableProps) => {
  const { slugToDelete, setSlugToDelete, handleConfirm, handleCancel } =
    usePostTable();

  return (
    <>
      <Table>
        <TableHeader>
          <tr className="bg-muted/80">
            <TableHead>Título</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </tr>
        </TableHeader>

        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.slug}>
              <TableCell className="font-medium text-foreground">
                {post.title}
              </TableCell>

              <TableCell>
                <Badge variant={post.published ? "success" : "warning"}>
                  {post.published ? "Publicado" : "Borrador"}
                </Badge>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {formatFullDate(post.createdAt)}
              </TableCell>

              <TableCell>
                <TableActions>
                  <TableActionBtn
                    variant="edit"
                    href={ROUTES.POSTS_EDIT(post.slug)}
                    title="Editar"
                  />
                  <TableActionBtn
                    variant="delete"
                    onClick={() => setSlugToDelete(post.slug)}
                    title="Eliminar"
                  />
                </TableActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!slugToDelete}
        title={"¿Eliminar post?"}
        description={
          "¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer."
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};
