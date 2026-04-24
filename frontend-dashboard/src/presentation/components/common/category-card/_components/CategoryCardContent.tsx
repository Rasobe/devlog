import { Category } from "@/domain/models";

interface CategoryCardContentProps {
  category: Category;
}

export const CategoryCardContent = ({ category }: CategoryCardContentProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold">{category.name}</h2>
      <p className="text-sm text-muted-foreground">{category.slug}</p>
    </div>
  );
};
