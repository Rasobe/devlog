const PostsTableSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Título
            </th>
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Estado
            </th>
            <th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
              Fecha
            </th>
            <th className="text-right text-sm text-muted-foreground font-medium px-4 py-3">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr
              key={index}
              className="hover:bg-muted/50 transition-colors border-t border-border"
            >
              <td className="px-4 py-3 text-sm font-medium text-foreground">
                <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
              </td>

              <td className="px-4 py-3">
                <div className="h-6 bg-muted rounded w-20 animate-pulse"></div>
              </td>

              <td className="px-4 py-3 text-sm text-muted-foreground">
                <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-8 bg-muted rounded w-8 animate-pulse"></div>
                  <div className="h-8 bg-muted rounded w-8 animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTableSkeleton;
