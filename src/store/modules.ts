import { ModuleTree } from 'vuex';

import { State } from '@/store/state';
import { recentModule, RecentModule } from '@/store/modules/recent';
import { greetingModule, GreetingModule } from '@/store/modules/greeting';
import { divisorsModule, DivisorsModule } from '@/store/modules/divisors';

export type Modules = {
  recent: RecentModule;
  greeting: GreetingModule;
  divisors: DivisorsModule;
};

export const modules: ModuleTree<State> = {
  recent: recentModule,
  greeting: greetingModule,
  divisors: divisorsModule,
};
