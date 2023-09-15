import {
  GreetingActions,
  greetingActions,
} from '@/store/modules/greeting/greeting.actions';
import {
  GreetingGetters,
  greetingGetters,
} from '@/store/modules/greeting/greeting.getters';
import {
  GreetingMutations,
  greetingMutations,
} from '@/store/modules/greeting/greeting.mutations';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';
import { State } from '@/store/state';
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from 'vuex';

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
    P extends Parameters<GreetingMutations[K]>[1],
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
