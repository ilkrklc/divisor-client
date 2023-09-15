import { GreetingState } from '@/store/modules/greeting/greeting.state';
import { CalculationType } from '@/typings/enums';
import { MutationTree } from 'vuex';

export enum GreetingMutationType {
  SetCalculationTypeName = 'SET_CALCULATION_TYPE_NAME',
}

export type GreetingMutations = {
  [GreetingMutationType.SetCalculationTypeName](
    state: GreetingState,
    name: CalculationType,
  ): void;
};

export const greetingMutations: MutationTree<GreetingState> &
  GreetingMutations = {
  [GreetingMutationType.SetCalculationTypeName](state, name) {
    state.calculationTypeName = name;
  },
};
