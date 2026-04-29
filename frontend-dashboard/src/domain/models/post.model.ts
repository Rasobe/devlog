import { UserRole } from "./auth.model";
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
  categorySlug?: string;
  tagSlugs?: string[];
}

export interface UpdatePostInput {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  categorySlug?: string;
  tagSlugs?: string[];
}

export type PostStatus = "ALL" | "PUBLISHED" | "DRAFT";

export interface UserContext {
  email?: string;
  role?: string;
}

export const canEditPost = (user: UserContext | null | undefined, post: Post): boolean => {
  if (!user || !user.email) return false;
  
  const isAuthor = post.author.email === user.email;
  const isAdmin = user.role === UserRole.ADMIN;
  
  return isAuthor || isAdmin;
};
