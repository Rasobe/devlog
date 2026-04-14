import { posts } from "@/db/schema";
import type { PaginationParams, PaginatedResult } from "@/types/pagination";

export type Post = typeof posts.$inferSelect;

export interface PostPaginationParams extends PaginationParams {
  search?: string;
  category?: string;
  tag?: string;
  published?: boolean;
}

export type PostInsert = typeof posts.$inferInsert;
export type PostUpdate = Partial<
  Omit<PostInsert, "id" | "createdAt" | "authorId">
>;

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  published?: boolean;
  categoryId?: string | null;
}

export type PostPaginatedResult = PaginatedResult<Post>;
