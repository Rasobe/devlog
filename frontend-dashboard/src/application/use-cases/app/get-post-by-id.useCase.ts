import { IPostRepository } from "@/domain/repositories/post.repository";

export class GetPostByIdUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(id: string) {
    return this.repository.getPostById(id);
  }
}
