import { IPostRepository } from "@/domain/repositories/post.repository";
import { getPosts, createPost } from "../api";
import { CreatePostInput, Post } from "@/domain/models/post.model";
import { PostMapper } from "../mappers/post.mapper";
import { authStorage } from "../services/auth-storage";

export class PostRepositoryImpl implements IPostRepository {
  async createPost(request: CreatePostInput): Promise<Post> {
    const { data, error } = await createPost({
      body: PostMapper.toApi(request),
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
