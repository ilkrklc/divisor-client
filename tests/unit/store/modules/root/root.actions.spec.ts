import { ActionContext } from 'vuex';

import {
  RootActionTypes,
  rootActions,
} from '@/store/modules/root/root.actions';
import { RootState, rootState } from '@/store/modules/root/root.state';
import { state, State } from '@/store/state';
import { RootMutationType } from '@/store/modules/root/root.mutations';

// Provide full action context
const actionContext: ActionContext<RootState, State> = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: rootState,
  getters: {},
  rootState: state,
  rootGetters: {},
};

describe('root actions', () => {
  it(RootActionTypes.ChangeVersion, () => {
    rootActions.CHANGE_VERSION(actionContext, '11.0.0');

    expect(actionContext.commit).toBeCalledWith(
      RootMutationType.ChangeVersion,
      '11.0.0',
    );
  });
});
