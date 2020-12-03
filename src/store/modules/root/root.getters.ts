import { GetterTree } from 'vuex';

import { State } from '@/store/state';
import { RootState } from '@/store/modules/root/root.state';

export type RootGetters = {
  getVersion(state: RootState): string;
};

export const rootGetters: GetterTree<RootState, State> & RootGetters = {
  getVersion(state) {
    return state.version;
  },
};
