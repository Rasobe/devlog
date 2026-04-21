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
} from "../types";
import { AuthorMapper } from "./author.mapper";
import { CategoryMapper } from "./category.mapper";
import { TagMapper } from "./tag.mapper";

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
      author: AuthorMapper.toDomain(response.author),
      category: response.category
        ? CategoryMapper.toDomain(response.category)
        : undefined,
      tags: response.postTags.map((pt) => TagMapper.toDomain(pt.tag)),
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
      categoryId: input.categoryId,
    };
  },

  toApiUpdate(input: UpdatePostInput): UpdatePostRequest {
    return {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      published: input.published,
      categoryId: input.categoryId,
    };
  },
};
