export interface BaseResult {
  divisors: number[];
  count: number;
  sum: number;
  multiplication: number;
  greatest?: number;
  smallest?: number;
}

export interface DivisorFormState {
  number: string;
  sort: 'not_defined' | 'asc' | 'desc';
  onlyProperDivisors: boolean;
}
