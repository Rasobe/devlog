import { IPostRepository } from "@/domain/repositories/post.repository";

export class DeletePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(slug: string): Promise<void> {
    return this.repository.delete(slug);
  }
}
