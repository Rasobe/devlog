import { Post } from "@/domain/models/post.model";
import { CreatePostRequest } from "@/infrastructure/api";

export interface IPostRepository {
  getPosts(publishedOnly?: boolean): Promise<Post[]>;
  createPost(request: CreatePostRequest): Promise<Post>;
}
