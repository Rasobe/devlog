import { CreatePostInput, UpdatePostInput, Post } from "@/domain/models/post.model";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  createPost(request: CreatePostInput): Promise<Post>;
  updatePost(slug: string, request: UpdatePostInput): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
  deletePost(id: string): Promise<void>;
}
