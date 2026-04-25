"use client";

import { PageHeader, TagModal } from "@/presentation/components";
import { Plus } from "lucide-react";
import { useState } from "react";

const TagsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={"Etiquetas"}
        description={"Administra tus etiquetas"}
        action={{
          label: "Agregar etiqueta",
          icon: <Plus size={16} />,
          onClick: () => setIsCreateModalOpen(true),
        }}
      />

      <TagModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default TagsPage;
