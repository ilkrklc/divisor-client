import {
  getDivisors,
  sumDivisors,
  multiplyDivisors,
  countDivisors,
  greatestProperDivisor,
  smallestProperDivisor,
} from 'divisor';

import { BaseResult } from '@/typings/interfaces';
import { CalculationType, SortOptions } from '@/typings/enums';

export default class DivisorResult implements BaseResult {
  calculationType?: CalculationType;
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
    this.smallest = smallestProperDivisor(number) || undefined;
  }
}
