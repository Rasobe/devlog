import { ITagRepository } from "@/domain/repositories";

export class UpdateTagUseCase {
  constructor(private readonly repository: ITagRepository) {}

  async execute(slug: string, name: string) {
    return this.repository.update(slug, name);
  }
}
