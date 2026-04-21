import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Cargando..." }: LoadingProps) => {
  return (
    <div className="flex items-center gap-2">
      <LoaderCircle className="animate-spin" size={18} />
      {message}
    </div>
  );
};
