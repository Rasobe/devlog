import { IPostRepository } from "@/domain/repositories/post.repository";
import { getPosts, GetPostsResponse } from "../api";

export class PostRepositoryImpl implements IPostRepository {
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
