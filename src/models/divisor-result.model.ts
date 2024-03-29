import { CalculationType, SortOptions } from '@/typings/enums';
import { BaseResult } from '@/typings/interfaces';
import {
  countDivisors,
  getDivisors,
  greatestProperDivisor,
  multiplyDivisors,
  sumDivisors,
} from 'divisor';

/**
 * Divisor result model
 * @summary Divisor calculation response
 * @property {CalculationType|undefined} calculationType Calculation type
 * @property {number[]|undefined} divisors Divisors result
 * @property {number} count Divisors count
 * @property {number|undefined} sum Sum of divisors
 * @property {number|undefined} multiplication Multiplication of divisors
 * @property {number|undefined} greatest Greatest common divisor - gcd
 */
export default class DivisorResult implements BaseResult {
  calculationType?: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;

  constructor({
    number,
    sort,
    onlyProperDivisors,
  }: {
    number: number;
    sort?: SortOptions;
    onlyProperDivisors: boolean;
  }) {
    this.calculationType = CalculationType.Divisors;
    this.divisors = getDivisors(number, {
      sort: sort === SortOptions.NotDefined ? undefined : sort,
      onlyProperDivisors,
    });
    this.count = countDivisors(number, onlyProperDivisors) || 0;
    this.sum = sumDivisors(number, onlyProperDivisors);
    this.multiplication = multiplyDivisors(number, onlyProperDivisors);
    this.greatest = greatestProperDivisor(number) || undefined;
  }
}
