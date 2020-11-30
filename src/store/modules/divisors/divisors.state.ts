import { DivisorFormState } from '@/typings/interfaces';

export type DivisorsState = {
  form: DivisorFormState;
  calculating: boolean;
};

export const divisorsState: DivisorsState = {
  form: {
    number: undefined,
    sort: 'not_defined',
    onlyProperDivisors: false,
  },
  calculating: false,
};
