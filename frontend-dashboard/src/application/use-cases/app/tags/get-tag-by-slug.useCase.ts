import { ITagRepository } from "@/domain/repositories";

export class GetTagBySlugUseCase {
  constructor(private readonly repository: ITagRepository) {}

  async execute(slug: string) {
    return this.repository.getBySlug(slug);
  }
}
