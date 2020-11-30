/**
 * Parses number input value as integer
 * @param {string} n Number input value as string
 * @returns {number | null} integer number if input value is correct null if not
 */
export function parseNumber(n: string): number | undefined {
  const number = parseInt(n, 10);
  if (isNaN(number)) return undefined;

  return number;
}
