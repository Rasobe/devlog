import { IPostRepository } from "@/domain/repositories/post.repository";
import { getPosts, createPost, getPostBySlug, getPostById, updatePost } from "../api";
import { CreatePostInput, UpdatePostInput, Post } from "@/domain/models/post.model";
import { PostMapper } from "../mappers/post.mapper";
import { authStorage } from "../services/auth-storage";

export class PostRepositoryImpl implements IPostRepository {
  async updatePost(id: string, request: UpdatePostInput): Promise<Post> {
    const { data, error } = await updatePost({
      path: {
        id,
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

  async getPostById(id: string): Promise<Post | null> {
    const { data, error } = await getPostById({
      path: { id },
      headers: {
        Authorization: `Bearer ${authStorage.getToken()}`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) return null;

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
  async getPosts(publishedOnly?: boolean): Promise<Post[]> {
    const { data, error } = await getPosts({
      query: {
        publishedOnly,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al obtener las entradas");
    }

    return data.map(PostMapper.toDomain);
  }
}
