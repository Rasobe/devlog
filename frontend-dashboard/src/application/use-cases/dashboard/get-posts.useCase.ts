import { IPostRepository } from "@/domain/repositories/post.repository";
import { GetPostsResponse } from "@/infrastructure/api";

export class GetPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(publishedOnly?: boolean): Promise<GetPostsResponse> {
    return this.repository.getPosts(publishedOnly);
  }
}
