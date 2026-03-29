import { IPostRepository } from "@/domain/repositories/post.repository";
import { GetPostsResponse } from "@/infrastructure/api";

export class GetPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(publishedOnly?: boolean): Promise<GetPostsResponse> {
    return this.postRepository.getPosts(publishedOnly);
  }
}
