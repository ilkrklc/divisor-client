import { RootState } from '@/store/modules/root/root.state';
import { MutationTree } from 'vuex';

export enum RootMutationType {
  ChangeVersion = 'CHANGE_VERSION',
}

export type RootMutations = {
  [RootMutationType.ChangeVersion](state: RootState, version: string): void;
};

export const rootMutations: MutationTree<RootState> & RootMutations = {
  [RootMutationType.ChangeVersion](state, version) {
    state.version = version;
  },
};
