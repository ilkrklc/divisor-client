import { MutationTree } from 'vuex';

import { RecentItem } from '@/typings/interfaces';
import { RecentState } from '@/store/modules/recent/recent.state';

export enum RecentMutationType {
  SetLoading = 'SET_LOADING',
  SetItems = 'SET_ITEMS',
  AddItem = 'ADD_ITEM',
}

export type RecentMutations = {
  [RecentMutationType.SetLoading](state: RecentState, loading: boolean): void;
  [RecentMutationType.SetItems](state: RecentState, items: RecentItem[]): void;
  [RecentMutationType.AddItem](state: RecentState, item: RecentItem): void;
};

export const recentMutations: MutationTree<RecentState> & RecentMutations = {
  [RecentMutationType.SetLoading](state, loading) {
    state.loading = loading;
  },
  [RecentMutationType.SetItems](state, items) {
    state.items = items;
  },
  [RecentMutationType.AddItem](state, item) {
    state.items = [...state.items, ...[item]];
  },
};
