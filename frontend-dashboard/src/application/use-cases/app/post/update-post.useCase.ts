import { UpdatePostInput } from "@/domain/models/post.model";
import { IPostRepository } from "@/domain/repositories/post.repository";

export class UpdatePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(slug: string, data: UpdatePostInput) {
    return this.repository.update(slug, data);
  }
}
