import { Category } from "@/domain/models";
import { ICategoryRepository } from "@/domain/repositories";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from "../api";
import { CategoryMapper } from "../mappers";

export class CategoryRepositoryImpl implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    const { data, error } = await getCategories();
    if (error) throw error;
    return (data ?? []).map(CategoryMapper.toDomain);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await getCategoryBySlug({
      path: {
        slug,
      },
    });
    if (error) throw error;
    if (!data) throw new Error("Categoría no encontrada");
    return CategoryMapper.toDomain(data);
  }

  async create(name: string): Promise<Category> {
    const { data, error } = await createCategory({
      body: {
        name,
      },
    });
    if (error) throw error;
    if (!data) throw new Error("Error al crear la categoría");
    return CategoryMapper.toDomain(data);
  }

  async update(slug: string, name: string): Promise<Category> {
    const { data, error } = await updateCategory({
      body: {
        name,
      },
      path: {
        slug,
      },
    });
    if (error) throw error;
    if (!data) throw new Error("Error al actualizar la categoría");
    return CategoryMapper.toDomain(data);
  }

  async delete(slug: string): Promise<void> {
    const { error } = await deleteCategory({
      path: {
        slug,
      },
    });
    if (error) throw error;
  }
}
