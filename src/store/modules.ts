import { ModuleTree } from 'vuex';

import { State } from '@/store/state';
import { recentModule, RecentModule } from '@/store/modules/recent';
import { greetingModule, GreetingModule } from '@/store/modules/greeting';

export type Modules = {
  recent: RecentModule;
  greeting: GreetingModule;
};

export const modules: ModuleTree<State> = {
  recent: recentModule,
  greeting: greetingModule,
};
