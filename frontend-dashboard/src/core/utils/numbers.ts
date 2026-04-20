/**
 * Formats a number to a compact, human-readable string (e.g., 1K, 1.5M).
 */
export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat("es-ES", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
};
