import { IPostRepository } from "@/domain/repositories/post.repository";

export class GetPostBySlugUseCase {
  constructor(private readonly repository: IPostRepository) {}

  async execute(slug: string) {
    return this.repository.getPostBySlug(slug);
  }
}
