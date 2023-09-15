import RecentItem from '@/models/recent-item.model';
import { RecentState } from '@/store/modules/recent/recent.state';
import { State } from '@/store/state';
import { GetterTree } from 'vuex';

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
