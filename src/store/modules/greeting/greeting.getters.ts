import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { GreetingState } from '@/store/modules/greeting/greeting.state';
import { CalculationType } from '@/typings/enums';

export type GreetingGetters = {
  calculationName(state: GreetingState): CalculationType;
  calculationDisplayName(state: GreetingState): string;
};

export const greetingGetters: GetterTree<GreetingState, State> &
  GreetingGetters = {
  calculationName(state) {
    return state.calculationTypeName;
  },
  calculationDisplayName(state) {
    return state.calculationTypeName === CalculationType.Divisors
      ? 'divisors'
      : 'common divisors';
  },
};
