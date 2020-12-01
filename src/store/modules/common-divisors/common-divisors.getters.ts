import { GetterTree } from 'vuex';

import { CommonDivisorFormState } from '@/typings/interfaces';
import { State } from '@/store/state';
import { CommonDivisorsState } from '@/store/modules/common-divisors/common-divisors.state';

export type CommonDivisorsGetters = {
  commonDivisorFormState(state: CommonDivisorsState): CommonDivisorFormState;
  commonDivisorCalculating(state: CommonDivisorsState): boolean;
};

export const commonDivisorsGetters: GetterTree<CommonDivisorsState, State> &
  CommonDivisorsGetters = {
  commonDivisorFormState(state) {
    return state.form;
  },
  commonDivisorCalculating(state) {
    return state.calculating;
  },
};
