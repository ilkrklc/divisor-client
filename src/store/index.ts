import { Modules, modules } from '@/store/modules';
import { CommonDivisorsModule } from '@/store/modules/common-divisors';
import { DivisorsModule } from '@/store/modules/divisors';
import { GreetingModule } from '@/store/modules/greeting';
import { RecentModule } from '@/store/modules/recent';
import { RootModule } from '@/store/modules/root';
import { State } from '@/store/state';
import { createLogger, createStore } from 'vuex';

export const store = createStore<State>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: modules,
});

export type Store = RecentModule<Pick<Modules, 'recent'>> &
  GreetingModule<Pick<Modules, 'greeting'>> &
  DivisorsModule<Pick<Modules, 'divisors'>> &
  CommonDivisorsModule<Pick<Modules, 'commonDivisors'>> &
  RootModule<Pick<Modules, 'root'>>;
