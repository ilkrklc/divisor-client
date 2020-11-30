import { BaseResult } from '@/typings/interfaces';
import { CalculationType } from '@/typings/enums';

export default class RecentItem implements BaseResult {
  calculationType: CalculationType;
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;
  leastCommonMultiple?: number;

  constructor() {
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
