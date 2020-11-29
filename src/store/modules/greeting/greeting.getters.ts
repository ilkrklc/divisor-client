import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { GreetingState } from '@/store/modules/greeting/greeting.state';

export type GreetingGetters = {
  calculationName(state: GreetingState): string;
};

export const greetingGetters: GetterTree<GreetingState, State> &
  GreetingGetters = {
  calculationName(state) {
    return state.calculationTypeName;
  },
};
