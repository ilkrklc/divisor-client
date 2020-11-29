import { DivisorFormState } from '@/typings/interfaces';

export interface DivisorsResult {
  divisors: number[];
  count: number;
  sum: number;
  multiplication: number;
  greatest: number;
  smallest: number;
}

export type DivisorsState = {
  form: DivisorFormState;
  calculating: boolean;
  result?: DivisorsResult;
};

export const divisorsState: DivisorsState = {
  form: {
    number: '',
    sort: 'not_defined',
    onlyProperDivisors: false,
  },
  calculating: false,
  result: undefined,
};
