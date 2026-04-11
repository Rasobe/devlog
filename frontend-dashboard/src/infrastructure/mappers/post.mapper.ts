import {
  CreatePostInput,
  Post,
  UpdatePostInput,
} from "@/domain/models/post.model";
import {
  CreatePostRequest,
  PagedResultPostResponse,
  PostResponse,
  UpdatePostRequest,
} from "../api";
import { PagedResult } from "@/domain/models/paged-result.model";

export const PostMapper = {
  /**  API → Domain (lo que lees del backend → lo que usas en tu app) */
  toDomain(response: PostResponse): Post {
    return {
      title: response.title,
      slug: response.slug,
      content: response.content,
      excerpt: response.excerpt,
      published: response.published,
      views: response.views,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  },

  toPagedDomain(response: PagedResultPostResponse): PagedResult<Post> {
    return {
      content: response.content?.map(this.toDomain) ?? [],
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      currentPage: response.currentPage,
    };
  },

  /** Domain → API (lo que envías desde tu app → lo que espera el backend) */
  toApiCreate(input: CreatePostInput): CreatePostRequest {
    return {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      published: input.published,
    };
  },

  toApiUpdate(input: UpdatePostInput): UpdatePostRequest {
    return {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      published: input.published,
    };
  },
};
