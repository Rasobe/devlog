import { Post } from "@/domain/models/post.model";
import { CreatePostRequest } from "@/infrastructure/api";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  createPost(request: CreatePostRequest): Promise<Post>;
}
