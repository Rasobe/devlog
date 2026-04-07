import { IPostRepository } from "@/domain/repositories/post.repository";

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(slug: string): Promise<void> {
    return this.postRepository.deletePost(slug);
  }
}
