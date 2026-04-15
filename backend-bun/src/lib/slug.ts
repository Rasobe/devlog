/**
 * Generates a URL-friendly slug from a given string.
 * Handles accented characters, special chars, and whitespace.
 */
export const generateSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(/\s+/g, "-");
