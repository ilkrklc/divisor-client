import {
  rootMutations,
  RootMutationType,
} from '@/store/modules/root/root.mutations';
import { rootState } from '@/store/modules/root/root.state';

describe('root mutations', () => {
  it(RootMutationType.ChangeVersion, () => {
    rootMutations.CHANGE_VERSION(rootState, '11.0.0');

    expect(rootState.version).toBe('11.0.0');
  });
});
