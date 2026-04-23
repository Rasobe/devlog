import { ITagRepository } from "@/domain/repositories";

export class DeleteTagUseCase {
  constructor(private readonly repository: ITagRepository) {}

  async execute(slug: string) {
    return this.repository.delete(slug);
  }
}
