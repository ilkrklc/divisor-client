import {
  RootMutationType,
  RootMutations,
} from '@/store/modules/root/root.mutations';
import { RootState } from '@/store/modules/root/root.state';
import { State } from '@/store/state';
import { ActionContext, ActionTree } from 'vuex';

export enum RootActionTypes {
  ChangeVersion = 'CHANGE_VERSION',
}

type RootActionAugments = Omit<ActionContext<RootState, State>, 'commit'> & {
  commit<K extends keyof RootMutations>(
    key: K,
    payload: Parameters<RootMutations[K]>[1],
  ): ReturnType<RootMutations[K]>;
};

export type RootActions = {
  [RootActionTypes.ChangeVersion](
    action: RootActionAugments,
    version: string,
  ): void;
};

export const rootActions: ActionTree<RootState, State> & RootActions = {
  [RootActionTypes.ChangeVersion]({ commit }, version) {
    commit(RootMutationType.ChangeVersion, version);
  },
};
