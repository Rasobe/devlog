import { UpdatePostInput } from "@/domain/models/post.model";
import { IPostRepository } from "@/domain/repositories/post.repository";

export class UpdatePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(id: string, data: UpdatePostInput) {
    return this.repository.updatePost(id, data);
  }
}
