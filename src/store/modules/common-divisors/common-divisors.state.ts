import { CommonDivisorFormState } from '@/typings/interfaces';
import { SortOptions } from '@/typings/enums';

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
