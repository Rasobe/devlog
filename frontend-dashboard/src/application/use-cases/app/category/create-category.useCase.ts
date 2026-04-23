import { ICategoryRepository } from "@/domain/repositories";

export class CreateCategoryUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(name: string) {
    return this.repository.create(name);
  }
}
