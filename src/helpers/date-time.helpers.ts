/**
 * Gets user locale
 * @returns {string} User locale
 */
function getUserLocale(): string {
  if (navigator.languages != undefined) return navigator.languages[0];
  else return navigator.language || 'en-US';
}

/**
 * Gets user locale formatted date string
 * @param {Date} date Date
 * @returns {string} Formatted date string
 */
export function getFormattedDateString(date: Date): string {
  return date.toLocaleString(getUserLocale());
}
