import { CommonDivisorsState } from '@/store/modules/common-divisors/common-divisors.state';
import { State } from '@/store/state';
import { CommonDivisorFormState } from '@/typings/interfaces';
import { GetterTree } from 'vuex';

export type CommonDivisorsGetters = {
  commonDivisorFormState(state: CommonDivisorsState): CommonDivisorFormState;
};

export const commonDivisorsGetters: GetterTree<CommonDivisorsState, State> &
  CommonDivisorsGetters = {
  commonDivisorFormState(state) {
    return state.form;
  },
};
