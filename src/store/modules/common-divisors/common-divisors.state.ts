import { SortOptions } from '@/typings/enums';
import { CommonDivisorFormState } from '@/typings/interfaces';

export type CommonDivisorsState = {
  form: CommonDivisorFormState;
};

export const commonDivisorsState: CommonDivisorsState = {
  form: {
    number1: undefined,
    number2: undefined,
    sort: SortOptions.NotDefined,
  },
};
