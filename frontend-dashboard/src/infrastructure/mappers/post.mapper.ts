import { CreatePostInput, Post } from "@/domain/models/post.model";
import { CreatePostRequest, PostResponse } from "../api";

export const PostMapper = {
  /**  API → Domain (lo que lees del backend → lo que usas en tu app) */
  toDomain(response: PostResponse): Post {
    return {
      title: response.title,
      slug: response.slug,
      content: response.content,
      excerpt: response.excerpt,
      published: response.published,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  },

  /** Domain → API (lo que envías desde tu app → lo que espera el backend) */
  toApi(input: CreatePostInput): CreatePostRequest {
    return {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      published: input.published,
    };
  },
};
