import { CreatePostInput, UpdatePostInput, Post } from "@/domain/models/post.model";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  createPost(request: CreatePostInput): Promise<Post>;
  updatePost(id: string, request: UpdatePostInput): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
}
