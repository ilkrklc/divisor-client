import { RootActions, rootActions } from '@/store/modules/root/root.actions';
import { RootGetters, rootGetters } from '@/store/modules/root/root.getters';
import {
  RootMutations,
  rootMutations,
} from '@/store/modules/root/root.mutations';
import { RootState, rootState } from '@/store/modules/root/root.state';
import { State } from '@/store/state';
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from 'vuex';

export const rootModule: Module<RootState, State> = {
  state: rootState,
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
};

export type RootModule<S = RootState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof RootMutations,
    P extends Parameters<RootMutations[K]>[1],
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<RootMutations[K]>;
} & {
  getters: {
    [K in keyof RootGetters]: ReturnType<RootGetters[K]>;
  };
} & {
  dispatch<K extends keyof RootActions>(
    key: K,
    payload?: Parameters<RootActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<RootActions[K]>;
};
