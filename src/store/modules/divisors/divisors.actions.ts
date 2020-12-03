import { ActionContext, ActionTree } from 'vuex';

import { State } from '@/store/state';
import { DivisorsState } from '@/store/modules/divisors/divisors.state';
import {
  DivisorsMutationType,
  DivisorsMutations,
} from '@/store/modules/divisors/divisors.mutations';
import { SortOptions } from '@/typings/enums';

export enum DivisorsActionTypes {
  SetDivisorsNumber = 'SET_DIVISORS_NUMBER',
  SetDivisorsSort = 'SET_DIVISORS_SORT',
  SetDivisorsOnlyProperDivisors = 'SET_DIVISORS_ONLY_PROPER_DIVISORS',
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
  [DivisorsActionTypes.SetDivisorsNumber](
    action: DivisorsActionAugments,
    number: number,
  ): void;
  [DivisorsActionTypes.SetDivisorsSort](
    action: DivisorsActionAugments,
    sort: SortOptions,
  ): void;
  [DivisorsActionTypes.SetDivisorsOnlyProperDivisors](
    action: DivisorsActionAugments,
    onlyProperDivisors: boolean,
  ): void;
};

export const divisorsActions: ActionTree<DivisorsState, State> &
  DivisorsActions = {
  [DivisorsActionTypes.SetDivisorsNumber]({ commit }, number) {
    commit(DivisorsMutationType.SetDivisorsNumber, number);
  },
  [DivisorsActionTypes.SetDivisorsSort]({ commit }, sort) {
    commit(DivisorsMutationType.SetDivisorsSort, sort);
  },
  [DivisorsActionTypes.SetDivisorsOnlyProperDivisors](
    { commit },
    onlyProperDivisors,
  ) {
    commit(
      DivisorsMutationType.SetDivisorsOnlyProperDivisors,
      onlyProperDivisors,
    );
  },
};
