import { PagedResult } from "@/domain/models/paged-result.model";
import { Post, PostStatus } from "@/domain/models/post.model";
import { IPostRepository } from "@/domain/repositories/post.repository";

export class GetPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(
    page: number = 0,
    size: number = 10,
    search?: string,
    status?: PostStatus,
  ): Promise<PagedResult<Post>> {
    return this.repository.getPosts(page, size, search, status);
  }
}
