import { createStore, createLogger } from 'vuex';

import { State } from '@/store/state';
import { modules, Modules } from '@/store/modules';

import { RecentModule } from '@/store/modules/recent';
import { GreetingModule } from '@/store/modules/greeting';
import { DivisorsModule } from '@/store/modules/divisors';
import { CommonDivisorsModule } from '@/store/modules/common-divisors';

export const store = createStore<State>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: modules,
});

export type Store = RecentModule<Pick<Modules, 'recent'>> &
  GreetingModule<Pick<Modules, 'greeting'>> &
  DivisorsModule<Pick<Modules, 'divisors'>> &
  CommonDivisorsModule<Pick<Modules, 'commonDivisors'>>;
