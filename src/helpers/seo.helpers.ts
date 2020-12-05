import { TitleBase, TitleSeparator } from '@/helpers/constants';

/**
 * Prepares page title
 * @param {string} pageTitle Page specific title part
 * @returns {string} Html title for route
 */
export function prepareTitle(pageTitle: string): string {
  // if no page specific title provided return default title
  if (!pageTitle) return TitleBase;

  return `${TitleBase} ${TitleSeparator} ${pageTitle}`;
}
