import { Author } from "./author.model";
import { Category } from "./category.model";
import { Tag } from "./tag.model";

export interface Post {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  category?: Category;
  tags: Tag[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  categoryId?: string;
}

export interface UpdatePostInput {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  categoryId?: string;
}

export type PostStatus = "ALL" | "PUBLISHED" | "DRAFT";
