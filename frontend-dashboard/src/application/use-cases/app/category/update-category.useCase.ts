import { ICategoryRepository } from "@/domain/repositories";

export class UpdateCategoryUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(slug: string, name: string) {
    return this.repository.update(slug, name);
  }
}
