import { IPostRepository } from "@/domain/repositories/post.repository";
import {
  getPosts,
  createPost,
  getPostBySlug,
  updatePostBySlug,
  deletePost,
} from "../api";
import {
  CreatePostInput,
  UpdatePostInput,
  Post,
} from "@/domain/models/post.model";
import { PostMapper } from "../mappers/post.mapper";
import { authStorage } from "../services/auth-storage";
import { PagedResult } from "@/domain/models/paged-result.model";

export class PostRepositoryImpl implements IPostRepository {
  async updatePost(slug: string, request: UpdatePostInput): Promise<Post> {
    const { data, error } = await updatePostBySlug({
      path: {
        slug,
      },
      body: PostMapper.toApiUpdate(request),
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al actualizar el post");
    }

    return PostMapper.toDomain(data);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await getPostBySlug({
      path: {
        slug,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al obtener el post");
    }

    return PostMapper.toDomain(data);
  }
  async createPost(request: CreatePostInput): Promise<Post> {
    const { data, error } = await createPost({
      body: PostMapper.toApiCreate(request),
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al crear el post");
    }

    return PostMapper.toDomain(data);
  }
  async getPosts(
    page: number,
    size: number,
    search?: string,
    publishedOnly?: boolean,
  ): Promise<PagedResult<Post>> {
    const { data, error } = await getPosts({
      query: {
        page,
        size,
        search,
        publishedOnly,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al obtener las entradas");
    }

    return PostMapper.toPagedDomain(data);
  }

  async deletePost(slug: string): Promise<void> {
    const { error } = await deletePost({
      path: {
        slug,
      },
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
    });

    if (error) {
      throw error;
    }
  }
}
