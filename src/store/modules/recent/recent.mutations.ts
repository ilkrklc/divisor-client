import { MutationTree } from 'vuex';

import RecentItem from '@/models/recent-item.model';
import { RecentState } from '@/store/modules/recent/recent.state';

export enum RecentMutationType {
  SetLoading = 'SET_LOADING',
  SetItems = 'SET_ITEMS',
  AddItem = 'ADD_ITEM',
  RemoveItem = 'REMOVE_ITEM',
  ClearItems = 'CLEAR_ITEMS',
}

export type RecentMutations = {
  [RecentMutationType.SetLoading](state: RecentState, loading: boolean): void;
  [RecentMutationType.SetItems](state: RecentState, items: RecentItem[]): void;
  [RecentMutationType.AddItem](state: RecentState, items: RecentItem[]): void;
  [RecentMutationType.RemoveItem](state: RecentState, index: number): void;
  [RecentMutationType.ClearItems](state: RecentState): void;
};

export const recentMutations: MutationTree<RecentState> & RecentMutations = {
  [RecentMutationType.SetLoading](state, loading) {
    state.loading = loading;
  },
  [RecentMutationType.SetItems](state, items) {
    state.items = items;
  },
  [RecentMutationType.AddItem](state, items) {
    state.items = items;
  },
  [RecentMutationType.RemoveItem](state, index) {
    state.items = state.items.splice(index, 1);
  },
  [RecentMutationType.ClearItems](state) {
    state.items = [];
  },
};
