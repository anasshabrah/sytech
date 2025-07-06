// lib/validation.ts

// Email must have at least one character before @, a domain, and a TLD
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isEmail(value: string): boolean {
  return emailRegex.test(value);
}

// Phone: optional +, 7–14 digits
export const phoneRegex = /^\+?\d{7,14}$/;
export function isPhone(value: string): boolean {
  return phoneRegex.test(value);
}
