import { ActionContext, ActionTree } from 'vuex';

import { CalculationType } from '@/typings/enums';
import { State } from '@/store/state';
import { GreetingState } from '@/store/modules/greeting/greeting.state';
import {
  GreetingMutationType,
  GreetingMutations,
} from '@/store/modules/greeting/greeting.mutations';

export enum GreetingActionTypes {
  SetCalculationTypeName = 'SET_CALCULATION_TYPE_NAME',
}

type GreetingActionAugments = Omit<
  ActionContext<GreetingState, State>,
  'commit'
> & {
  commit<K extends keyof GreetingMutations>(
    key: K,
    payload: Parameters<GreetingMutations[K]>[1],
  ): ReturnType<GreetingMutations[K]>;
};

export type GreetingActions = {
  [GreetingActionTypes.SetCalculationTypeName](
    action: GreetingActionAugments,
    name: CalculationType,
  ): void;
};

export const greetingActions: ActionTree<GreetingState, State> &
  GreetingActions = {
  [GreetingActionTypes.SetCalculationTypeName]({ commit }, name) {
    commit(GreetingMutationType.SetCalculationTypeName, name);
  },
};
