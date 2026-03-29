import { IPostRepository } from "@/domain/repositories/post.repository";
import {
  CreatePostRequest,
  CreatePostResponse,
  getPosts,
  createPost,
  GetPostsResponse,
} from "../api";

export class PostRepositoryImpl implements IPostRepository {
  async createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
    const { data, error } = await createPost({
      body: request,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error al crear el post");
    }

    return data;
  }
  async getPosts(publishedOnly?: boolean): Promise<GetPostsResponse> {
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

    return data;
  }
}
