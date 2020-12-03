import { SortOptions } from '@/typings/enums';
import { DivisorFormState } from '@/typings/interfaces';

export type DivisorsState = {
  form: DivisorFormState;
  calculating: boolean;
};

export const divisorsState: DivisorsState = {
  form: {
    number: undefined,
    sort: SortOptions.NotDefined,
    onlyProperDivisors: false,
  },
  calculating: false,
};
