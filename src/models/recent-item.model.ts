import { nanoid } from 'nanoid';

import { BaseResult } from '@/typings/interfaces';
import { CalculationType, SortOptions } from '@/typings/enums';
import { getFormattedDateString } from '@/helpers/date-time.helpers';

export default class RecentItem implements BaseResult {
  id?: string;
  calculationType: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;
  leastCommonMultiple?: number;
  createdOn?: string;

  number1: number;
  number2: number;
  sort?: SortOptions;
  onlyProperDivisors: boolean;

  constructor({
    number1,
    number2,
    sort,
    onlyProperDivisors,
    id,
    createdOn,
  }: {
    number1: number;
    number2?: number;
    sort: SortOptions;
    onlyProperDivisors?: boolean;
    id?: string;
    createdOn?: string;
  }) {
    this.id = id || nanoid();
    this.number1 = number1 || 0;
    this.number2 = number2 || 0;
    this.sort = sort || undefined;
    this.onlyProperDivisors = onlyProperDivisors || false;
    this.createdOn = createdOn || getFormattedDateString(new Date());

    this.count = 0;
    this.calculationType = CalculationType.Divisors;
  }

  deserialize(item: Record<string, unknown>): RecentItem {
    this.calculationType = item.calculationType as CalculationType;
    this.divisors = (item.divisors as number[]) || undefined;
    this.count = item.count as number;
    this.sum = (item.sum as number) || undefined;
    this.multiplication = (item.multiplication as number) || undefined;
    this.greatest = (item.greatest as number) || undefined;
    this.smallest = (item.smallest as number) || undefined;
    this.leastCommonMultiple =
      (item.leastCommonMultiple as number) || undefined;

    return this;
  }

  fromCalculationResult(result: BaseResult): RecentItem {
    this.calculationType = result.calculationType || this.calculationType;
    this.divisors = result.divisors || this.divisors;
    this.count = result.count || this.count;
    this.sum = result.sum || this.sum;
    this.multiplication = result.multiplication || this.multiplication;
    this.greatest = result.greatest || this.greatest;
    this.smallest = result.smallest || this.smallest;
    this.leastCommonMultiple =
      result.leastCommonMultiple || this.leastCommonMultiple;

    return this;
  }
}
