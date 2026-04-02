import { Post } from "@/domain/models/post.model";
import { IPostRepository } from "@/domain/repositories/post.repository";

export class GetPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(publishedOnly?: boolean): Promise<Post[]> {
    return this.repository.getPosts(publishedOnly);
  }
}
