import { DivisorsState } from '@/store/modules/divisors/divisors.state';
import { SortOptions } from '@/typings/enums';
import { MutationTree } from 'vuex';

export enum DivisorsMutationType {
  SetDivisorsNumber = 'SET_DIVISORS_NUMBER',
  SetDivisorsSort = 'SET_DIVISORS_SORT',
  SetDivisorsOnlyProperDivisors = 'SET_DIVISORS_ONLY_PROPER_DIVISORS',
}

export type DivisorsMutations = {
  [DivisorsMutationType.SetDivisorsNumber](
    state: DivisorsState,
    number: number,
  ): void;
  [DivisorsMutationType.SetDivisorsSort](
    state: DivisorsState,
    sort: SortOptions,
  ): void;
  [DivisorsMutationType.SetDivisorsOnlyProperDivisors](
    state: DivisorsState,
    onlyProperDivisors: boolean,
  ): void;
};

export const divisorsMutations: MutationTree<DivisorsState> &
  DivisorsMutations = {
  [DivisorsMutationType.SetDivisorsNumber](state, number) {
    state.form.number = number;
  },
  [DivisorsMutationType.SetDivisorsSort](state, sort) {
    state.form.sort = sort;
  },
  [DivisorsMutationType.SetDivisorsOnlyProperDivisors](
    state,
    onlyProperDivisors,
  ) {
    state.form.onlyProperDivisors = onlyProperDivisors;
  },
};
