import { ActionContext, ActionTree } from 'vuex';

import { State } from '@/store/state';
import { CommonDivisorsState } from '@/store/modules/common-divisors/common-divisors.state';
import {
  CommonDivisorsMutationType,
  CommonDivisorsMutations,
} from '@/store/modules/common-divisors/common-divisors.mutations';
import { SortOptions } from '@/typings/enums';

export enum CommonDivisorsActionTypes {
  SetCommonDivisorNumber1 = 'SET_COMMON_DIVISOR_NUMBER_ONE',
  SetCommonDivisorNumber2 = 'SET_COMMON_DIVISOR_NUMBER_TWO',
  SetCommonDivisorSort = 'SET_COMMON_DIVISOR_SORT',
}

type CommonDivisorsActionAugments = Omit<
  ActionContext<CommonDivisorsState, State>,
  'commit'
> & {
  commit<K extends keyof CommonDivisorsMutations>(
    key: K,
    payload: Parameters<CommonDivisorsMutations[K]>[1],
  ): ReturnType<CommonDivisorsMutations[K]>;
};

export type CommonDivisorsActions = {
  [CommonDivisorsActionTypes.SetCommonDivisorNumber1](
    action: CommonDivisorsActionAugments,
    number: number,
  ): void;
  [CommonDivisorsActionTypes.SetCommonDivisorNumber2](
    action: CommonDivisorsActionAugments,
    number: number,
  ): void;
  [CommonDivisorsActionTypes.SetCommonDivisorSort](
    action: CommonDivisorsActionAugments,
    sort: SortOptions,
  ): void;
};

export const commonDivisorsActions: ActionTree<CommonDivisorsState, State> &
  CommonDivisorsActions = {
  [CommonDivisorsActionTypes.SetCommonDivisorNumber1]({ commit }, number) {
    commit(CommonDivisorsMutationType.SetCommonDivisorNumber1, number);
  },
  [CommonDivisorsActionTypes.SetCommonDivisorNumber2]({ commit }, number) {
    commit(CommonDivisorsMutationType.SetCommonDivisorNumber2, number);
  },
  [CommonDivisorsActionTypes.SetCommonDivisorSort]({ commit }, sort) {
    commit(CommonDivisorsMutationType.SetCommonDivisorSort, sort);
  },
};
