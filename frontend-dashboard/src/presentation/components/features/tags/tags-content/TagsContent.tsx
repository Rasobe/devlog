"use client";

import {
  EmptyState,
  ErrorState,
  FetchState,
  PageHeader,
} from "@/presentation/components/common";
import { Plus, Tags } from "lucide-react";
import { TagModal } from "../tag-modal";
import { useTagsContent } from "./useTagsContent";

import { TagCard } from "../tag-card";

export const TagsContent = () => {
  const {
    isCreateModalOpen,
    sortedGroupedTags,
    isLoading,
    error,
    handleOpenCreateModal,
    handleCloseCreateModal,
  } = useTagsContent();

  if (isLoading) return <FetchState message="Cargando etiquetas..." />;

  if (error)
    return (
      <ErrorState
        message="Error al cargar las etiquetas"
        showBackButton={false}
      />
    );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={"Etiquetas"}
        description={"Administra tus etiquetas"}
        action={{
          label: "Agregar etiqueta",
          icon: <Plus size={16} />,
          onClick: handleOpenCreateModal,
        }}
      />

      {sortedGroupedTags && !Object.keys(sortedGroupedTags).length && (
        <EmptyState
          title="No hay etiqu etas"
          description="Crea una etiqueta para empezar"
          icon={<Tags size={48} />}
        />
      )}

      {Object.entries(sortedGroupedTags ?? {}).map(([letter, tags]) => (
        <div key={letter}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-px bg-border" />
            <h2 className="text-lg font-semibold">{letter}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <TagCard key={tag.slug} tag={tag} />
            ))}
          </div>
        </div>
      ))}

      <TagModal open={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </div>
  );
};
