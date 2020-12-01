import { ActionContext, ActionTree } from 'vuex';

import { State } from '@/store/state';
import { DivisorsState } from '@/store/modules/divisors/divisors.state';
import {
  DivisorsMutationType,
  DivisorsMutations,
} from '@/store/modules/divisors/divisors.mutations';
import { SortOptions } from '@/typings/enums';

export enum DivisorsActionTypes {
  SetNumber = 'SET_NUMBER',
  SetSort = 'SET_SORT',
  SetOnlyProperDivisors = 'SET_ONLY_PROPER_DIVISORS',
}

type DivisorsActionAugments = Omit<
  ActionContext<DivisorsState, State>,
  'commit'
> & {
  commit<K extends keyof DivisorsMutations>(
    key: K,
    payload: Parameters<DivisorsMutations[K]>[1],
  ): ReturnType<DivisorsMutations[K]>;
};

export type DivisorsActions = {
  [DivisorsActionTypes.SetNumber](
    action: DivisorsActionAugments,
    number: number,
  ): void;
  [DivisorsActionTypes.SetSort](
    action: DivisorsActionAugments,
    sort: SortOptions,
  ): void;
  [DivisorsActionTypes.SetOnlyProperDivisors](
    action: DivisorsActionAugments,
    onlyProperDivisors: boolean,
  ): void;
};

export const divisorsActions: ActionTree<DivisorsState, State> &
  DivisorsActions = {
  [DivisorsActionTypes.SetNumber]({ commit }, number) {
    commit(DivisorsMutationType.SetNumber, number);
  },
  [DivisorsActionTypes.SetSort]({ commit }, sort) {
    commit(DivisorsMutationType.SetSort, sort);
  },
  [DivisorsActionTypes.SetOnlyProperDivisors]({ commit }, onlyProperDivisors) {
    commit(DivisorsMutationType.SetOnlyProperDivisors, onlyProperDivisors);
  },
};
