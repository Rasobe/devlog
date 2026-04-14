import { posts } from "@/db/schema";

export type PostInsert = typeof posts.$inferInsert;

export type PostUpdate = Partial<
  Omit<PostInsert, "id" | "createdAt" | "authorId">
>;

export type CreatePostInput = {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  published?: boolean;
  categoryId?: string | null;
};

export type { PaginationParams, PaginatedResult } from "@/types/pagination";
