import { Category } from "@/domain/models";

interface UseCategoryCardActionsProps {
  category: Category;
}

export const useCategoryCardActions = ({
  category,
}: UseCategoryCardActionsProps) => {
  const onEdit = () => {};

  const onDelete = () => {};

  return { onEdit, onDelete };
};
