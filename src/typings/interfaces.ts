import { CalculationType, SortOptions } from '@/typings/enums';

/**
 * Base calculation result
 * @property {CalculationType|undefined} calculationType Calculation type
 * @property {number[]|undefined} divisors Divisors result
 * @property {number} count Divisors count
 * @property {number|undefined} sum Sum of divisors
 * @property {number|undefined} multiplication Multiplication of divisors
 * @property {number|undefined} greatest Greatest common divisor - gcd
 * @property {number|undefined} smallest Smallest common divisor
 * @property {number|undefined} leastCommonMultiple Least common multiple - lcm
 */
export interface BaseResult {
  calculationType?: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;
  leastCommonMultiple?: number;
}

/**
 * Divisor form state
 * @summary Divisor form options state
 */
export interface DivisorFormState {
  number?: number;
  sort: SortOptions;
  onlyProperDivisors: boolean;
}

/**
 * Common divisor form state
 * @summary Common divisor form options state
 */
export interface CommonDivisorFormState {
  number1?: number;
  number2?: number;
  sort: SortOptions;
}

/**
 * Select list item to used to type select inputs
 */
export interface SelectListItem {
  text: string;
  value: string;
}
