import {
  CreatePostInput,
  UpdatePostInput,
  Post,
} from "@/domain/models/post.model";
import { PagedResult } from "../models/paged-result.model";

export interface IPostRepository {
  getPosts(
    page: number,
    size: number,
    search?: string,
    publishedOnly?: boolean,
  ): Promise<PagedResult<Post>>;
  getPostBySlug(slug: string): Promise<Post | null>;
  createPost(request: CreatePostInput): Promise<Post>;
  updatePost(slug: string, request: UpdatePostInput): Promise<Post>;
  deletePost(slug: string): Promise<void>;
}
