import {
  CommonDivisorsActions,
  commonDivisorsActions,
} from '@/store/modules/common-divisors/common-divisors.actions';
import {
  CommonDivisorsGetters,
  commonDivisorsGetters,
} from '@/store/modules/common-divisors/common-divisors.getters';
import {
  CommonDivisorsMutations,
  commonDivisorsMutations,
} from '@/store/modules/common-divisors/common-divisors.mutations';
import {
  CommonDivisorsState,
  commonDivisorsState,
} from '@/store/modules/common-divisors/common-divisors.state';
import { State } from '@/store/state';
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from 'vuex';

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
    P extends Parameters<CommonDivisorsMutations[K]>[1],
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
