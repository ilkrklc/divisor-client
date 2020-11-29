import { ActionContext, ActionTree } from 'vuex';

import { State } from '@/store/state';
import { RecentState } from '@/store/modules/recent/recent.state';
import {
  RecentMutationType,
  RecentMutations,
} from '@/store/modules/recent/recent.mutations';

export enum RecentActionTypes {
  GetItems = 'GET_ITEMS',
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
};

export const recentActions: ActionTree<RecentState, State> & RecentActions = {
  [RecentActionTypes.GetItems]({ commit }) {
    commit(RecentMutationType.SetLoading, true);

    // TODO - Persist through local storage

    commit(RecentMutationType.SetLoading, false);
    commit(RecentMutationType.SetItems, []);
  },
};
