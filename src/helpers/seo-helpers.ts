import { TITLE_BASE, TITLE_SEPARATOR } from './constants';

/**
 * Prepares page title
 * @param {string} pageTitle Page specific title part
 * @returns {string} Html title for route
 */
export function prepareTitle(pageTitle: string): string {
  // if no page specific title provided return default title
  if (!pageTitle) return TITLE_BASE;

  return `${TITLE_BASE} ${TITLE_SEPARATOR} ${pageTitle}`;
}
