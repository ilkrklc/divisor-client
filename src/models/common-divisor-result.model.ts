import {
  getCommonDivisors,
  sumCommonDivisors,
  multiplyCommonDivisors,
  countCommonDivisors,
  greatestCommonDivisor,
  leastCommonMultiple,
} from 'divisor';

import { BaseResult } from '@/typings/interfaces';
import { CalculationType } from '@/typings/enums';

export default class CommonDivisorResult implements BaseResult {
  calculationType?: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;
  leastCommonMultiple?: number;

  constructor(number1: number, number2: number, sort?: string) {
    this.calculationType = CalculationType.CommonDivisors;
    this.divisors = getCommonDivisors(number1, number2, sort);
    this.count = countCommonDivisors(number1, number2);
    this.sum = sumCommonDivisors(number1, number2);
    this.multiplication = multiplyCommonDivisors(number1, number2);
    this.greatest = greatestCommonDivisor(number1, number2) || undefined;
    this.smallest = undefined;
    this.leastCommonMultiple =
      leastCommonMultiple(number1, number2) || undefined;
  }
}
