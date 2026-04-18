import {
  CreatePostInput,
  Post,
  UpdatePostInput,
} from "@/domain/models/post.model";
import { PagedResult } from "@/domain/models/paged-result.model";
import type {
  PostResponse,
  PostsPagedResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from "../api/types";

export const PostMapper = {
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

  toPagedDomain(response: PostsPagedResponse): PagedResult<Post> {
    return {
      content: response.data.map(this.toDomain),
      totalElements: response.meta.total,
      totalPages: response.meta.totalPages,
      currentPage: response.meta.page,
    };
  },

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
