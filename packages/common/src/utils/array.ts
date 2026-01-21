import { chunk, groupBy, sortBy, uniq } from "lodash";

/**
 * Split an array into chunks of a specified size
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  return chunk(arr, size);
}

/**
 * Get unique values from an array
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return uniq(arr);
}

/**
 * Group array items by a key
 */
export function groupByKey<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return groupBy(arr, key as string);
}

/**
 * Sort array by a key
 */
export function sortByKey<T>(arr: T[], key: keyof T): T[] {
  return sortBy(arr, key as string);
}

/**
 * Safely get the first element of an array
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Safely get the last element of an array
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
