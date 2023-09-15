import RecentItem from '@/models/recent-item.model';
import { RecentState } from '@/store/modules/recent/recent.state';
import { MutationTree } from 'vuex';

export enum RecentMutationType {
  SetItems = 'SET_ITEMS',
  ClearItems = 'CLEAR_ITEMS',
}

export type RecentMutations = {
  [RecentMutationType.SetItems](state: RecentState, items: RecentItem[]): void;
  [RecentMutationType.ClearItems](state: RecentState): void;
};

export const recentMutations: MutationTree<RecentState> & RecentMutations = {
  [RecentMutationType.SetItems](state, items) {
    state.items = items;
  },
  [RecentMutationType.ClearItems](state) {
    state.items = [];
  },
};
