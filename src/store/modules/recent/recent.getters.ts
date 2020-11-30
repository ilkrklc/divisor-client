import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { RecentState } from '@/store/modules/recent/recent.state';

export type RecentGetters = {
  totalRecentCount(state: RecentState): number;
  isRecentLoading(state: RecentState): boolean;
};

export const recentGetters: GetterTree<RecentState, State> & RecentGetters = {
  totalRecentCount(state) {
    return state.items.length;
  },
  isRecentLoading(state) {
    return state.loading;
  },
};
