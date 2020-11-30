import { CalculationType } from '@/typings/enums';

export interface BaseResult {
  divisors?: number[];
  count: number;
  sum?: number;
  multiplication?: number;
  greatest?: number;
  smallest?: number;
}

export interface DivisorFormState {
  number?: number;
  sort: 'not_defined' | 'asc' | 'desc';
  onlyProperDivisors: boolean;
}

export interface CommonDivisorFormState {
  number: string;
  sort: 'not_defined' | 'asc' | 'desc';
  onlyProperDivisors: boolean;
}

export interface SelectList {
  text: string;
  value: string;
}

export interface RecentItem extends BaseResult {
  calculationType: CalculationType;
}
