import { deletePostUseCase } from "@/infrastructure/dependencies";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const usePostTable = () => {
  const queryClient = useQueryClient()
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (!slugToDelete) return
    
    setIsDeleting(true)
    try {
      await deletePostUseCase.execute(slugToDelete)
      await queryClient.invalidateQueries({ queryKey: ["posts"] })
      setSlugToDelete(null)
    } catch (error) {
      console.error("Error al eliminar el post:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => setSlugToDelete(null)

  return {
    slugToDelete,
    setSlugToDelete,
    handleConfirm,
    handleCancel,
    isDeleting,
  }
}