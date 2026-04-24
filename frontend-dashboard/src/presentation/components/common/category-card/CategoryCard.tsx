import { Category } from "@/domain/models";
import {
  CategoryCardActions,
  CategoryCardContent,
  CategoryCardHeader,
} from "./_components";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="flex flex-col bg-background border rounded-lg p-4 gap-4">
      <div className="flex flex-row gap-3 items-start">
        <CategoryCardHeader />
        <CategoryCardContent category={category} />
      </div>

      <div className="pt-2 border-t border-border/50">
        <CategoryCardActions category={category} />
      </div>
    </div>
  );
};
