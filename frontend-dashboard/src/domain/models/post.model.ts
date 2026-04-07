export interface Post {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
}

export interface UpdatePostInput {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
}
