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
  [RecentMutationType.RemoveItem](state: RecentState, index: number): void;
  [RecentMutationType.ClearItems](state: RecentState): void;
};

export const recentMutations: MutationTree<RecentState> & RecentMutations = {
  [RecentMutationType.SetItems](state, items) {
    state.items = items;
  },
  [RecentMutationType.RemoveItem](state, index) {
    const newItems = state.items;
    newItems.splice(index, 1);

    state.items = newItems;
  },
  [RecentMutationType.ClearItems](state) {
    state.items = [];
  },
};
