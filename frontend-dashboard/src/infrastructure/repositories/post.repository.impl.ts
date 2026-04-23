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
  PostStatus,
} from "@/domain/models/post.model";
import { PostMapper } from "../mappers/post.mapper";
import { PagedResult } from "@/domain/models/paged-result.model";

export class PostRepositoryImpl implements IPostRepository {
  async update(slug: string, request: UpdatePostInput): Promise<Post> {
    const { data, error } = await updatePostBySlug({
      path: {
        slug,
      },
      body: PostMapper.toApiUpdate(request),
    });
    if (error) throw error;
    if (!data) throw new Error("Error al actualizar el post");
    return PostMapper.toDomain(data);
  }

  async getBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await getPostBySlug({
      path: {
        slug,
      },
    });
    if (error) throw error;
    if (!data) throw new Error("Error al obtener el post");
    return PostMapper.toDomain(data);
  }

  async create(request: CreatePostInput): Promise<Post> {
    console.log(request);
    const { data, error } = await createPost({
      body: PostMapper.toApiCreate(request),
    });
    if (error) throw error;
    if (!data) throw new Error("Error al crear el post");
    return PostMapper.toDomain(data);
  }

  async getPaginated(
    page: number,
    size: number,
    search?: string,
    status?: PostStatus,
  ): Promise<PagedResult<Post>> {
    let published: boolean | undefined;
    if (status === "PUBLISHED") {
      published = true;
    } else if (status === "DRAFT") {
      published = false;
    }

    const { data, error } = await getPosts({
      query: {
        page: String(page),
        limit: String(size),
        search,
        published,
      },
    });
    if (error) throw error;
    if (!data) throw new Error("Error al obtener los posts");
    return PostMapper.toPagedDomain(data);
  }

  async delete(slug: string): Promise<void> {
    const { error } = await deletePost({
      path: {
        slug,
      },
    });
    if (error) throw error;
  }
}
