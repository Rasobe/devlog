export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(/\s+/g, "-");

export const generateSlug = slugify;
export const generateUsername = slugify;
