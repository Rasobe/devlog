import {
  defaultNameValues,
  nameSchema,
  NameSchema,
} from "@/presentation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UseResourceModalProps {
  name?: string;
  onClose: () => void;
}

export const useResourceModal = ({ name, onClose }: UseResourceModalProps) => {
  const form = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
    defaultValues: defaultNameValues,
  });

  useEffect(() => {
    form.reset({ name: name ?? "" });
  }, [name]);

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  return { form, onCloseModal };
};
