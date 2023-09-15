import {
  commonDivisorsModule,
  CommonDivisorsModule,
} from '@/store/modules/common-divisors';
import { divisorsModule, DivisorsModule } from '@/store/modules/divisors';
import { greetingModule, GreetingModule } from '@/store/modules/greeting';
import { recentModule, RecentModule } from '@/store/modules/recent';
import { rootModule, RootModule } from '@/store/modules/root';
import { State } from '@/store/state';
import { ModuleTree } from 'vuex';

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
