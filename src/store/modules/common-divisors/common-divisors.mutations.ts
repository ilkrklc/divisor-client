import { MutationTree } from 'vuex';

import { CommonDivisorsState } from '@/store/modules/common-divisors/common-divisors.state';
import { SortOptions } from '@/typings/enums';

export enum CommonDivisorsMutationType {
  SetCommonDivisorNumber1 = 'SET_COMMON_DIVISOR_NUMBER_ONE',
  SetCommonDivisorNumber2 = 'SET_COMMON_DIVISOR_NUMBER_TWO',
  SetCommonDivisorSort = 'SET_COMMON_DIVISOR_SORT',
}

export type CommonDivisorsMutations = {
  [CommonDivisorsMutationType.SetCommonDivisorNumber1](
    state: CommonDivisorsState,
    number: number,
  ): void;
  [CommonDivisorsMutationType.SetCommonDivisorNumber2](
    state: CommonDivisorsState,
    number: number,
  ): void;
  [CommonDivisorsMutationType.SetCommonDivisorSort](
    state: CommonDivisorsState,
    sort: SortOptions,
  ): void;
};

export const commonDivisorsMutations: MutationTree<CommonDivisorsState> &
  CommonDivisorsMutations = {
  [CommonDivisorsMutationType.SetCommonDivisorNumber1](state, number) {
    state.form.number1 = number;
  },
  [CommonDivisorsMutationType.SetCommonDivisorNumber2](state, number) {
    state.form.number2 = number;
  },
  [CommonDivisorsMutationType.SetCommonDivisorSort](state, sort) {
    state.form.sort = sort;
  },
};
