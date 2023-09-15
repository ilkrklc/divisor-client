import {
  DivisorsActions,
  divisorsActions,
} from '@/store/modules/divisors/divisors.actions';
import {
  DivisorsGetters,
  divisorsGetters,
} from '@/store/modules/divisors/divisors.getters';
import {
  DivisorsMutations,
  divisorsMutations,
} from '@/store/modules/divisors/divisors.mutations';
import {
  DivisorsState,
  divisorsState,
} from '@/store/modules/divisors/divisors.state';
import { State } from '@/store/state';
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from 'vuex';

export const divisorsModule: Module<DivisorsState, State> = {
  state: divisorsState,
  mutations: divisorsMutations,
  actions: divisorsActions,
  getters: divisorsGetters,
};

export type DivisorsModule<S = DivisorsState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof DivisorsMutations,
    P extends Parameters<DivisorsMutations[K]>[1],
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<DivisorsMutations[K]>;
} & {
  getters: {
    [K in keyof DivisorsGetters]: ReturnType<DivisorsGetters[K]>;
  };
} & {
  dispatch<K extends keyof DivisorsActions>(
    key: K,
    payload?: Parameters<DivisorsActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<DivisorsActions[K]>;
};
