"use client";

import { PageHeader } from "@/presentation/components";
import { Plus } from "lucide-react";

const TagsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={"Etiquetas"}
        description={"Administra tus etiquetas"}
        action={{
          label: "Agregar etiqueta",
          icon: <Plus size={16} />,
          onClick: () => {},
        }}
      />
    </div>
  );
};

export default TagsPage;
