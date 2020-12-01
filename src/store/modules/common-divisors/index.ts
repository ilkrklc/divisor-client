import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

import { State } from '@/store/state';
import {
  CommonDivisorsState,
  commonDivisorsState,
} from '@/store/modules/common-divisors/common-divisors.state';
import {
  commonDivisorsMutations,
  CommonDivisorsMutations,
} from '@/store/modules/common-divisors/common-divisors.mutations';
import {
  commonDivisorsActions,
  CommonDivisorsActions,
} from '@/store/modules/common-divisors/common-divisors.actions';
import {
  commonDivisorsGetters,
  CommonDivisorsGetters,
} from '@/store/modules/common-divisors/common-divisors.getters';

export const commonDivisorsModule: Module<CommonDivisorsState, State> = {
  state: commonDivisorsState,
  mutations: commonDivisorsMutations,
  actions: commonDivisorsActions,
  getters: commonDivisorsGetters,
};

export type CommonDivisorsModule<S = CommonDivisorsState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof CommonDivisorsMutations,
    P extends Parameters<CommonDivisorsMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<CommonDivisorsMutations[K]>;
} & {
  getters: {
    [K in keyof CommonDivisorsGetters]: ReturnType<CommonDivisorsGetters[K]>;
  };
} & {
  dispatch<K extends keyof CommonDivisorsActions>(
    key: K,
    payload?: Parameters<CommonDivisorsActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<CommonDivisorsActions[K]>;
};
