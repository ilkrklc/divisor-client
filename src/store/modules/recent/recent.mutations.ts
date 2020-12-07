import { MutationTree } from 'vuex';

import RecentItem from '@/models/recent-item.model';
import { RecentState } from '@/store/modules/recent/recent.state';

export enum RecentMutationType {
  SetItems = 'SET_ITEMS',
  RemoveItem = 'REMOVE_ITEM',
  ClearItems = 'CLEAR_ITEMS',
}

export type RecentMutations = {
  [RecentMutationType.SetItems](state: RecentState, items: RecentItem[]): void;
  [RecentMutationType.RemoveItem](state: RecentState, id: string): void;
  [RecentMutationType.ClearItems](state: RecentState): void;
};

export const recentMutations: MutationTree<RecentState> & RecentMutations = {
  [RecentMutationType.SetItems](state, items) {
    state.items = items;
  },
  [RecentMutationType.RemoveItem](state, id) {
    state.items = state.items.filter(item => item.id !== id);
  },
  [RecentMutationType.ClearItems](state) {
    state.items = [];
  },
};
