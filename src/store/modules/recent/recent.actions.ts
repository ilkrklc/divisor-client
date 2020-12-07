import { ActionContext, ActionTree } from 'vuex';

import {
  getPersistedValue,
  setPersistedValue,
} from '@/helpers/persist.helpers';
import { PersistStateKey, SortOptions } from '@/typings/enums';
import RecentItem from '@/models/recent-item.model';

import { State } from '@/store/state';
import { RecentState } from '@/store/modules/recent/recent.state';
import {
  RecentMutationType,
  RecentMutations,
} from '@/store/modules/recent/recent.mutations';

export enum RecentActionTypes {
  GetItems = 'GET_ITEMS',
  AddItem = 'ADD_ITEM',
  RemoveItem = 'REMOVE_ITEM',
  ClearItems = 'CLEAR_ITEMS',
}

type RecentActionAugments = Omit<
  ActionContext<RecentState, State>,
  'commit'
> & {
  commit<K extends keyof RecentMutations>(
    key: K,
    payload: Parameters<RecentMutations[K]>[1],
  ): ReturnType<RecentMutations[K]>;
};

export type RecentActions = {
  [RecentActionTypes.GetItems](action: RecentActionAugments): void;
  [RecentActionTypes.AddItem](
    action: RecentActionAugments,
    item: RecentItem,
  ): void;
  [RecentActionTypes.RemoveItem](
    action: RecentActionAugments,
    index: number,
  ): void;
  [RecentActionTypes.ClearItems](action: RecentActionAugments): void;
};

export const recentActions: ActionTree<RecentState, State> & RecentActions = {
  [RecentActionTypes.GetItems]({ commit }) {
    // initialize returned items
    let items: RecentItem[] = [];

    // try to persist recent items from locale storage
    const persistedItemsJson = getPersistedValue(PersistStateKey.RecentItems);
    if (persistedItemsJson) {
      const persistedItems: Record<string, unknown> = JSON.parse(
        persistedItemsJson,
      );

      if (Array.isArray(persistedItems) && persistedItems.length > 0)
        items = persistedItems.map(item =>
          new RecentItem({
            number1: item.number1 as number,
            number2: item.number2 as number,
            sort: item.sort as SortOptions,
            onlyProperDivisors: item.onlyProperDivisors as boolean,
            id: item.id as string,
            createdOn: item.createdOn as string,
          }).deserialize(item),
        );
    }

    // set fetched items
    commit(RecentMutationType.SetItems, items);
  },
  [RecentActionTypes.AddItem]({ commit, state }, item) {
    const newItems = [...[item], ...state.items];

    // update locale storage
    setPersistedValue(PersistStateKey.RecentItems, JSON.stringify(newItems));

    // add new item
    commit(RecentMutationType.SetItems, newItems);
  },
  [RecentActionTypes.RemoveItem]({ commit }, index) {
    commit(RecentMutationType.RemoveItem, index);
  },
  [RecentActionTypes.ClearItems]({ commit }) {
    commit(RecentMutationType.ClearItems, undefined);
  },
};
