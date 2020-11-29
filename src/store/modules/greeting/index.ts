import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

import { State } from '@/store/state';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';
import {
  greetingMutations,
  GreetingMutations,
} from '@/store/modules/greeting/greeting.mutations';
import {
  greetingActions,
  GreetingActions,
} from '@/store/modules/greeting/greeting.actions';
import {
  greetingGetters,
  GreetingGetters,
} from '@/store/modules/greeting/greeting.getters';

export const greetingModule: Module<GreetingState, State> = {
  state: greetingState,
  mutations: greetingMutations,
  actions: greetingActions,
  getters: greetingGetters,
};

export type GreetingModule<S = GreetingState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof GreetingMutations,
    P extends Parameters<GreetingMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<GreetingMutations[K]>;
} & {
  getters: {
    [K in keyof GreetingGetters]: ReturnType<GreetingGetters[K]>;
  };
} & {
  dispatch<K extends keyof GreetingActions>(
    key: K,
    payload?: Parameters<GreetingActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<GreetingActions[K]>;
};
