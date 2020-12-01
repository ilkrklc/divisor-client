import { CalculationType, SortOptions } from '@/typings/enums';

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

export interface DivisorFormState {
  number?: number;
  sort: 'not_defined' | 'asc' | 'desc';
  onlyProperDivisors: boolean;
}

export interface CommonDivisorFormState {
  number1?: number;
  number2?: number;
  sort: SortOptions;
}

export interface SelectList {
  text: string;
  value: string;
}
