import { CalculationType, SortOptions } from '@/typings/enums';

/**
 * Gets enum values as provided return type
 * @param {T} Enum Enum object
 * @template T Enum generic template
 * @returns {string[] | number[]} Enum values as provided type
 */
export function getEnumValues<
  T extends { [key: number]: string | number },
  R = string | number,
>(Enum: T): R[] {
  const keys = Object.keys(Enum).filter(
    (k) => typeof Enum[k as keyof T] === 'string',
  );
  const values = keys.map((k) => Enum[k as keyof T] as unknown as R);

  return values;
}

/**
 * Gets calculation type display name
 * @param {CalculationType} calculationType Calculation type
 * @returns {string} Calculation type display name
 */
export function getCalculationTypeDisplayName(
  calculationType: CalculationType,
): string {
  let result = '';

  switch (calculationType) {
    case CalculationType.Divisors:
      result = 'divisors';
      break;
    case CalculationType.CommonDivisors:
      result = 'common divisors';
      break;
    default:
      result = 'divisors';
      break;
  }

  return result;
}

/**
 * Gets sort option display name
 * @param {SortOption} sortOption Sort option
 * @returns {string} Sort option display name
 */
export function getSortOptionDisplayName(sortOption: SortOptions): string {
  let result = '';

  switch (sortOption) {
    case SortOptions.Asc:
      result = 'Ascending';
      break;
    case SortOptions.Desc:
      result = 'Descending';
      break;
    default:
      result = 'Ascending';
      break;
  }

  return result;
}
