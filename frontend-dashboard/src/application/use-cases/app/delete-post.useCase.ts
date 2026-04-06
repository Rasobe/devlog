import { IPostRepository } from "@/domain/repositories/post.repository";

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string): Promise<void> {
    return this.postRepository.deletePost(id);
  }
}
