import {
  rootMutations,
  RootMutationType,
} from '@/store/modules/root/root.mutations';
import { RootState } from '@/store/modules/root/root.state';

describe('root mutations', () => {
  it(RootMutationType.ChangeVersion, () => {
    const state: RootState = {
      version: '0.0.0',
    };

    console.log(rootMutations.CHANGE_VERSION(state, '1.0.0'));

    expect(state.version).toBe('1.0.0');
  });
});
