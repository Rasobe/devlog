import { CategoriesContent } from "@/presentation/components";
import { PageHeader } from "@/presentation/components/common";
import { ROUTES } from "@/presentation/config/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorías",
};

const CategoriesPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Categorías"
        description="Administra las categorías de tu blog"
        action={{
          label: "Crear Categoría",
          href: ROUTES.CATEGORIES_NEW,
          icon: <Plus size={16} />
        }}
      />
      <CategoriesContent />
    </div>
  );
};

export default CategoriesPage;
