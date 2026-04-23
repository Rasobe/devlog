import { Category } from "../models/category.model";

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
  create(name: string): Promise<Category>;
  update(slug: string, name: string): Promise<Category>;
  delete(slug: string): Promise<void>;
}
