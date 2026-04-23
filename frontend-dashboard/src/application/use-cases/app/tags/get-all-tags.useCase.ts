import { ITagRepository } from "@/domain/repositories";

export class GetAllTagsUseCase {
  constructor(private readonly repository: ITagRepository) {}

  async execute() {
    return this.repository.getAll();
  }
}
