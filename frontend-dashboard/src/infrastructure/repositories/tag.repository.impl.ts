import { Category } from "@/domain/models";
import { ICategoryRepository } from "@/domain/repositories";
import { createTag, deleteTag, getTagBySlug, getTags, updateTag } from "../api";
import { TagMapper } from "../mappers";

export class TagRepositoryImpl implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    const { data, error } = await getTags();
    if (error) throw error;
    return data?.map(TagMapper.toDomain) ?? [];
  }
  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await getTagBySlug({
      path: {
        slug,
      },
    });
    if (error) throw error;
    return data ? TagMapper.toDomain(data) : null;
  }
  async create(name: string): Promise<Category> {
    const { data, error } = await createTag({
      body: {
        name,
      },
    });
    if (error) throw error;
    return TagMapper.toDomain(data);
  }
  async update(slug: string, name: string): Promise<Category> {
    const { data, error } = await updateTag({
      body: { name },
      path: { slug },
    });
    if (error) throw error;
    return TagMapper.toDomain(data);
  }
  async delete(slug: string): Promise<void> {
    const { error } = await deleteTag({
      path: { slug },
    });
    if (error) throw error;
  }
}
