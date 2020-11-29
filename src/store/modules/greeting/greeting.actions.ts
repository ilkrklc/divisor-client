import { ActionContext, ActionTree } from 'vuex';

import { State } from '@/store/state';
import { GreetingState } from '@/store/modules/greeting/greeting.state';
import {
  GreetingMutationType,
  GreetingMutations,
} from '@/store/modules/greeting/greeting.mutations';

export enum GreetingActionTypes {
  SetCalculationTypeMessage = 'SET_CALCULATION_TYPE_MESSAGE',
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
  [GreetingActionTypes.SetCalculationTypeMessage](
    action: GreetingActionAugments,
    name: string,
  ): void;
};

export const greetingActions: ActionTree<GreetingState, State> &
  GreetingActions = {
  [GreetingActionTypes.SetCalculationTypeMessage]({ commit }, name) {
    commit(GreetingMutationType.SetCalculationTypeName, name);
  },
};
