import {
  getCommonDivisors,
  sumCommonDivisors,
  multiplyCommonDivisors,
  countCommonDivisors,
  greatestCommonDivisor,
  leastCommonMultiple,
} from 'divisor';

import { BaseResult } from '@/typings/interfaces';
import { CalculationType, SortOptions } from '@/typings/enums';

/**
 * Common divisor result model
 * @summary Common divisor calculation response
 * @property {CalculationType|undefined} calculationType Calculation type
 * @property {number[]|undefined} divisors Divisors result
 * @property {number} count Divisors count
 * @property {number|undefined} sum Sum of divisors
 * @property {number|undefined} multiplication Multiplication of divisors
 * @property {number|undefined} greatest Greatest common divisor - gcd
<<<<<<< HEAD
=======
 * @property {number|undefined} smallest Smallest common divisor
>>>>>>> main
 * @property {number|undefined} leastCommonMultiple Least common multiple - lcm
 */
export default class CommonDivisorResult implements BaseResult {
  calculationType?: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  leastCommonMultiple?: number;

  constructor({
    number1,
    number2,
    sort,
  }: {
    number1: number;
    number2: number;
    sort?: SortOptions;
  }) {
    this.calculationType = CalculationType.CommonDivisors;
    this.divisors = getCommonDivisors(
      number1,
      number2,
      sort === SortOptions.NotDefined ? undefined : sort,
    );
    this.count = countCommonDivisors(number1, number2);
    this.sum = sumCommonDivisors(number1, number2);
    this.multiplication = multiplyCommonDivisors(number1, number2);
    this.greatest = greatestCommonDivisor(number1, number2) || undefined;
    this.leastCommonMultiple =
      leastCommonMultiple(number1, number2) || undefined;
  }
}
