import { GetterTree } from 'vuex';

import { DivisorFormState } from '@/typings/interfaces';
import { State } from '@/store/state';
import { DivisorsState } from '@/store/modules/divisors/divisors.state';

export type DivisorsGetters = {
  divisorFormState(state: DivisorsState): DivisorFormState;
  divisorCalculating(state: DivisorsState): boolean;
};

export const divisorsGetters: GetterTree<DivisorsState, State> &
  DivisorsGetters = {
  divisorFormState(state) {
    return state.form;
  },
  divisorCalculating(state) {
    return state.calculating;
  },
};
