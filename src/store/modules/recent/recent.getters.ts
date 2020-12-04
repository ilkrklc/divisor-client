import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { RecentState } from '@/store/modules/recent/recent.state';
import RecentItem from '@/models/recent-item.model';

export type RecentGetters = {
  totalRecentCount(state: RecentState): number;
  recentCalculations(state: RecentState): RecentItem[];
  hasRecentCalculations(state: RecentState): boolean;
};

export const recentGetters: GetterTree<RecentState, State> & RecentGetters = {
  totalRecentCount(state) {
    return state.items.length;
  },
  recentCalculations(state) {
    return state.items;
  },
  hasRecentCalculations(state) {
    return state.items.length > 0;
  },
};
