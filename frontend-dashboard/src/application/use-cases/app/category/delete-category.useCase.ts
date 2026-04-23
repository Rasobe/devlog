import { ICategoryRepository } from "@/domain/repositories";

export class DeleteCategoryUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(slug: string) {
    return this.repository.deleteCategory(slug);
  }
}
