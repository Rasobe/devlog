import { IPostRepository } from "@/domain/repositories/post.repository";
import { CreatePostInput, Post } from "@/domain/models/post.model";

export class CreatePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(request: CreatePostInput): Promise<Post> {
    return this.repository.createPost(request);
  }
}
