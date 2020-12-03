import { ModuleTree } from 'vuex';

import { State } from '@/store/state';
import { recentModule, RecentModule } from '@/store/modules/recent';
import { greetingModule, GreetingModule } from '@/store/modules/greeting';
import { divisorsModule, DivisorsModule } from '@/store/modules/divisors';
import {
  commonDivisorsModule,
  CommonDivisorsModule,
} from '@/store/modules/common-divisors';
import { rootModule, RootModule } from '@/store/modules/root';

export type Modules = {
  recent: RecentModule;
  greeting: GreetingModule;
  divisors: DivisorsModule;
  commonDivisors: CommonDivisorsModule;
  root: RootModule;
};

export const modules: ModuleTree<State> = {
  recent: recentModule,
  greeting: greetingModule,
  divisors: divisorsModule,
  commonDivisors: commonDivisorsModule,
  root: rootModule,
};
