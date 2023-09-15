import { DivisorsState } from '@/store/modules/divisors/divisors.state';
import { State } from '@/store/state';
import { DivisorFormState } from '@/typings/interfaces';
import { GetterTree } from 'vuex';

export type DivisorsGetters = {
  divisorFormState(state: DivisorsState): DivisorFormState;
};

export const divisorsGetters: GetterTree<DivisorsState, State> &
  DivisorsGetters = {
  divisorFormState(state) {
    return state.form;
  },
};
