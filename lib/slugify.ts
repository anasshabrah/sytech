// lib/slugify.ts
export const slugify = (str: string, { rtl = false } = {}): string =>
  (rtl ? str.split('').reverse().join('') : str)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-أ-ي]+/g, '')
    .toLowerCase();
