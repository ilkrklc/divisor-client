import { ActionContext } from 'vuex';

import {
  GreetingActionTypes,
  greetingActions,
} from '@/store/modules/greeting/greeting.actions';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';
import { state, State } from '@/store/state';
import { GreetingMutationType } from '@/store/modules/greeting/greeting.mutations';
import { CalculationType } from '@/typings/enums';

// Provide full action context
const actionContext: ActionContext<GreetingState, State> = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: greetingState,
  getters: {},
  rootState: state,
  rootGetters: {},
};

describe('greeting actions', () => {
  it(GreetingActionTypes.SetCalculationTypeName, () => {
    greetingActions.SET_CALCULATION_TYPE_NAME(
      actionContext,
      CalculationType.CommonDivisors,
    );

    expect(actionContext.commit).toBeCalledWith(
      GreetingMutationType.SetCalculationTypeName,
      CalculationType.CommonDivisors,
    );
  });
});
