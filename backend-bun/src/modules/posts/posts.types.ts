import { posts } from "@/db/schema";
import type { PaginationParams, PaginatedResult } from "@/types/pagination";

export type Post = typeof posts.$inferSelect;

export interface PostPaginationParams extends PaginationParams {
  search?: string;
  category?: string;
  tag?: string;
  published?: boolean;
  authorId?: string;
}

export type PostInsert = typeof posts.$inferInsert;
export type PostUpdate = Partial<
  Omit<PostInsert, "id" | "createdAt" | "authorId" | "categoryId">
> & {
  categorySlug?: string | null;
  tagSlugs?: string[];
};

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  published?: boolean;
  categorySlug?: string | null;
  tagSlugs?: string[] | null;
}

export type PostWithRelations = Omit<
  Post,
  "categoryId" | "published" | "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  published: boolean;
  author: {
    displayName: string;
    email: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  postTags: {
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
};

export type PostPaginatedResult = PaginatedResult<PostWithRelations>;
