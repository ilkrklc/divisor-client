import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { RecentState } from '@/store/modules/recent/recent.state';

export type RecentGetters = {
  totalCount(state: RecentState): number;
};

export const recentGetters: GetterTree<RecentState, State> & RecentGetters = {
  totalCount(state) {
    return state.items.length;
  },
};
