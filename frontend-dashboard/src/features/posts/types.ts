export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePostDTO = Omit<
  Post,
  "id" | "slug" | "authorId" | "createdAt" | "updatedAt"
>;

export type UpdatePostDTO = Partial<CreatePostDTO>;
