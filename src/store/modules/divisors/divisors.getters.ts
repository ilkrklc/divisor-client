import { GetterTree } from 'vuex';

import { DivisorFormState } from '@/typings/interfaces';
import { State } from '@/store/state';
import {
  DivisorsState,
  DivisorsResult,
} from '@/store/modules/divisors/divisors.state';

export type DivisorsGetters = {
  divisorFormState(state: DivisorsState): DivisorFormState;
  divisorResult(state: DivisorsState): DivisorsResult | undefined;
  divisorCalculating(state: DivisorsState): boolean;
};

export const divisorsGetters: GetterTree<DivisorsState, State> &
  DivisorsGetters = {
  divisorFormState(state) {
    return state.form;
  },
  divisorResult(state) {
    return state.result || undefined;
  },
  divisorCalculating(state) {
    return state.calculating;
  },
};
