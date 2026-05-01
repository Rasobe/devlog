interface ActivityBarSkeletonProps {
  rows: number;
}

export const ActivityBarSkeleton = ({ rows }: ActivityBarSkeletonProps) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={`skeleton-${i}`}
        className="flex items-center gap-3 animate-pulse"
      >
        <div className="w-8 h-2.5 rounded bg-border" />
        <div className="flex-1 h-1.5 rounded-full bg-border" />
        <div className="w-4 h-2.5 rounded bg-border" />
      </div>
    ))}
  </>
);
