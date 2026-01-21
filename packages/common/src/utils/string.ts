import { camelCase, kebabCase, snakeCase, trim, truncate, upperFirst } from "lodash";

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return camelCase(str);
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
  return kebabCase(str);
}

/**
 * Convert string to snake_case
 */
export function toSnakeCase(str: string): string {
  return snakeCase(str);
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return upperFirst(str.toLowerCase());
}

/**
 * Trim whitespace from both ends
 */
export function trimString(str: string): string {
  return trim(str);
}

/**
 * Truncate string to specified length
 */
export function truncateString(str: string, length: number = 30): string {
  return truncate(str, { length });
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmptyString(str: string): boolean {
  return trim(str).length === 0;
}

/**
 * Slugify string (URL-safe)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Check if string contains substring (case-insensitive)
 */
export function containsIgnoreCase(str: string, substring: string): boolean {
  return str.toLowerCase().includes(substring.toLowerCase());
}
