import { RootState } from '@/store/modules/root/root.state';
import { State } from '@/store/state';
import { GetterTree } from 'vuex';

export type RootGetters = {
  getVersion(state: RootState): string;
};

export const rootGetters: GetterTree<RootState, State> & RootGetters = {
  getVersion(state) {
    return state.version;
  },
};
