"use client";

import { useState } from "react";
import { CategoriesContent, CategoryModal } from "@/presentation/components";
import { PageHeader } from "@/presentation/components/common";
import { Plus } from "lucide-react";

const CategoriesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categorías"
        description="Administra las categorías de tu blog"
        action={{
          label: "Crear Categoría",
          icon: <Plus size={16} />,
          onClick: () => setIsCreateModalOpen(true),
        }}
      />

      <CategoriesContent />

      <CategoryModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default CategoriesPage;
