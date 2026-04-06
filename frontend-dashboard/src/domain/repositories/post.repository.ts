import { Post } from "@/domain/models/post.model";
import { CreatePostRequest, UpdatePostRequest } from "@/infrastructure/api";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  createPost(request: CreatePostRequest): Promise<Post>;
  updatePost(id: string, request: UpdatePostRequest): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
}
