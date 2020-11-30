import { MutationTree } from 'vuex';

import { DivisorsState } from '@/store/modules/divisors/divisors.state';

export enum DivisorsMutationType {
  SetNumber = 'SET_NUMBER',
  SetSort = 'SET_SORT',
  SetOnlyProperDivisors = 'SET_ONLY_PROPER_DIVISORS',
}

export type DivisorsMutations = {
  [DivisorsMutationType.SetNumber](state: DivisorsState, number: number): void;
  [DivisorsMutationType.SetSort](
    state: DivisorsState,
    sort: 'not_defined' | 'asc' | 'desc',
  ): void;
  [DivisorsMutationType.SetOnlyProperDivisors](
    state: DivisorsState,
    onlyProperDivisors: boolean,
  ): void;
};

export const divisorsMutations: MutationTree<DivisorsState> &
  DivisorsMutations = {
  [DivisorsMutationType.SetNumber](state, number) {
    state.form.number = number;
  },
  [DivisorsMutationType.SetSort](state, sort) {
    state.form.sort = sort;
  },
  [DivisorsMutationType.SetOnlyProperDivisors](state, onlyProperDivisors) {
    state.form.onlyProperDivisors = onlyProperDivisors;
  },
};
