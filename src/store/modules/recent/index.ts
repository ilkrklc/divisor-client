import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

import { State } from '@/store/state';
import { RecentState, recentState } from '@/store/modules/recent/recent.state';
import {
  recentMutations,
  RecentMutations,
} from '@/store/modules/recent/recent.mutations';
import {
  recentActions,
  RecentActions,
} from '@/store/modules/recent/recent.actions';
import {
  recentGetters,
  RecentGetters,
} from '@/store/modules/recent/recent.getters';

export const recentModule: Module<RecentState, State> = {
  state: recentState,
  mutations: recentMutations,
  actions: recentActions,
  getters: recentGetters,
};

export type RecentModule<S = RecentState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof RecentMutations,
    P extends Parameters<RecentMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<RecentMutations[K]>;
} & {
  getters: {
    [K in keyof RecentGetters]: ReturnType<RecentGetters[K]>;
  };
} & {
  dispatch<K extends keyof RecentActions>(
    key: K,
    payload?: Parameters<RecentActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<RecentActions[K]>;
};
