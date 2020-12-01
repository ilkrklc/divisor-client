import { ActionContext, ActionTree } from 'vuex';

import {
  getPersistedJsonValue,
  setPersistedJsonValue,
} from '@/helpers/persist.helpers';
import { PersistStateKey } from '@/typings/enums';
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
    // turn on loading
    commit(RecentMutationType.SetLoading, true);

    // initialize returned items
    let items: RecentItem[] = [];

    // try to persist recent items from locale storage
    const persistedItemsJson = getPersistedJsonValue(
      PersistStateKey.RecentItems,
    );
    if (persistedItemsJson) {
      const persistedItems: Record<string, unknown> = JSON.parse(
        persistedItemsJson,
      );

      if (Array.isArray(persistedItems) && persistedItems.length > 0)
        items = persistedItems.map(item =>
          new RecentItem(
            item.number as number,
            item.sort as 'asc' | 'desc' | undefined,
            item.onlyProperDivisors as boolean,
            item.id as string,
            item.createdOn as string,
          ).deserialize(item),
        );
    }

    // turn off loading
    commit(RecentMutationType.SetLoading, false);

    // set fetched items
    commit(RecentMutationType.SetItems, items);
  },
  [RecentActionTypes.AddItem]({ commit, state }, item) {
    const newItems = [...[item], ...state.items];

    // update locale storage
    setPersistedJsonValue(
      PersistStateKey.RecentItems,
      JSON.stringify(newItems),
    );

    // add new item
    commit(RecentMutationType.AddItem, newItems);
  },
  [RecentActionTypes.RemoveItem]({ commit }, index) {
    commit(RecentMutationType.RemoveItem, index);
  },
  [RecentActionTypes.ClearItems]({ commit }) {
    commit(RecentMutationType.ClearItems, undefined);
  },
};
