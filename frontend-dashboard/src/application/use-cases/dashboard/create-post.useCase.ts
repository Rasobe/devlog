import { IPostRepository } from "@/domain/repositories/post.repository";
import { CreatePostRequest, CreatePostResponse } from "@/infrastructure/api";

export class CreatePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    return this.repository.createPost(request);
  }
}
