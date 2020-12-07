import { DefaultLocale } from '@/helpers/constants';

/**
 * Gets user locale
 * @returns {string} User locale
 */
export function getUserLocale(): string {
  if (navigator.languages.length !== 0) return navigator.languages[0];
  else return navigator.language || DefaultLocale;
}

/**
 * Gets user locale formatted date string
 * @param {Date} date Date
 * @returns {string} Formatted date string
 */
export function getFormattedDateString(date: Date): string {
  return date.toLocaleString(getUserLocale());
}
