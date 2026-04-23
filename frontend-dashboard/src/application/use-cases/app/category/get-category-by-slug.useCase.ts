import { ICategoryRepository } from "@/domain/repositories";

export class GetCategoryBySlugUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(slug: string) {
    return this.repository.getBySlug(slug);
  }
}
