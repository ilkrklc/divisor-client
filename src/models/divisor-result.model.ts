import {
  getDivisors,
  sumDivisors,
  multiplyDivisors,
  countDivisors,
  greatestProperDivisor,
  smallestProperDivisor,
} from 'divisor';

import { BaseResult } from '@/typings/interfaces';

export default class DivisorResult implements BaseResult {
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;

  constructor({
    number,
    sort,
    onlyProperDivisors,
  }: {
    number: number;
    sort?: string;
    onlyProperDivisors: boolean;
  }) {
    this.divisors = getDivisors(number, {
      sort,
      onlyProperDivisors,
    });
    this.count = countDivisors(number, onlyProperDivisors) || 0;
    this.sum = sumDivisors(number, onlyProperDivisors);
    this.multiplication = multiplyDivisors(number, onlyProperDivisors);
    this.greatest = greatestProperDivisor(number) || undefined;
    this.smallest = smallestProperDivisor(number) || undefined;
  }
}
