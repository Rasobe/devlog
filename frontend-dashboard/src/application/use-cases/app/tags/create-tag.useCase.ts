import { ITagRepository } from "@/domain/repositories";

export class CreateTagUseCase {
  constructor(private readonly repository: ITagRepository) {}

  async execute(name: string) {
    return this.repository.create(name);
  }
}
