import { Tag } from "../models";

export interface ITagRepository {
  getAll(): Promise<Tag[]>;
  getBySlug(slug: string): Promise<Tag | null>;
  create(name: string): Promise<Tag>;
  update(slug: string, name: string): Promise<Tag>;
  delete(slug: string): Promise<void>;
}
