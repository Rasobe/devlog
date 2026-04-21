import { cn } from "@/core/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn(`animate-pulse bg-muted`, className)}></div>;
};
