import { ICategoryRepository } from "@/domain/repositories";

export class GetAllCategoriesUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute() {
    return this.repository.getAll();
  }
}
