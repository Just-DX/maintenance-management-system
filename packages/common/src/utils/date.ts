import {
  addDays,
  differenceInDays,
  format,
  formatDistance,
  formatRelative,
  isValid,
  parseISO,
  subDays,
} from "date-fns";

/**
 * Format a date to a specific pattern
 */
export function formatDate(date: Date | string, pattern: string = "yyyy-MM-dd"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, pattern);
}

/**
 * Get relative time from now (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

/**
 * Format date relative to now (e.g., "tomorrow at 5:00 PM")
 */
export function getRelativeDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatRelative(dateObj, new Date());
}

/**
 * Check if a date string or Date object is valid
 */
export function isValidDate(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj);
}

/**
 * Add days to a date
 */
export function addDaysToDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return addDays(dateObj, days);
}

/**
 * Subtract days from a date
 */
export function subtractDaysFromDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return subDays(dateObj, days);
}

/**
 * Get the difference in days between two dates
 */
export function getDaysDifference(dateLeft: Date | string, dateRight: Date | string): number {
  const leftObj = typeof dateLeft === "string" ? parseISO(dateLeft) : dateLeft;
  const rightObj = typeof dateRight === "string" ? parseISO(dateRight) : dateRight;
  return differenceInDays(leftObj, rightObj);
}

/**
 * Get ISO string from date
 */
export function toISOString(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return dateObj.toISOString();
}
