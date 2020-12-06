import { ActionContext } from 'vuex';

import {
  RootActionTypes,
  rootActions,
} from '@/store/modules/root/root.actions';
import { RootState } from '@/store/modules/root/root.state';
import { state, State } from '@/store/state';

// Provide full action context
const actionContext: ActionContext<RootState, State> = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: state,
  getters: {},
  rootState: state,
  rootGetters: {},
};

describe('root actions', () => {
  it(RootActionTypes.ChangeVersion, () => {
    rootActions.CHANGE_VERSION(actionContext, '11.0.0');

    expect(actionContext.commit).toBeCalledWith('CHANGE_VERSION', '11.0.0');
  });
});
