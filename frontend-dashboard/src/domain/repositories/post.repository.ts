import {
  CreatePostInput,
  UpdatePostInput,
  Post,
  PostStatus,
} from "@/domain/models/post.model";
import { PagedResult } from "../models/paged-result.model";

export interface IPostRepository {
  getPaginated(
    page: number,
    size: number,
    search?: string,
    status?: PostStatus,
  ): Promise<PagedResult<Post>>;
  getBySlug(slug: string): Promise<Post | null>;
  create(request: CreatePostInput): Promise<Post>;
  update(slug: string, request: UpdatePostInput): Promise<Post>;
  delete(slug: string): Promise<void>;
}
