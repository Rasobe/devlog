import { Category } from "../models/category.model";

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
  createCategory(name: string): Promise<Category>;
  updateCategory(slug: string, name: string): Promise<Category>;
  deleteCategory(slug: string): Promise<void>;
}
