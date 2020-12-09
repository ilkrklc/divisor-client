import { ActionContext } from 'vuex';

import {
  DivisorsActionTypes,
  divisorsActions,
} from '@/store/modules/divisors/divisors.actions';
import {
  DivisorsState,
  divisorsState,
} from '@/store/modules/divisors/divisors.state';
import { state, State } from '@/store/state';
import { DivisorsMutationType } from '@/store/modules/divisors/divisors.mutations';
import { SortOptions } from '@/typings/enums';

// Provide full action context
const actionContext: ActionContext<DivisorsState, State> = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: divisorsState,
  getters: {},
  rootState: state,
  rootGetters: {},
};

describe('divisors actions', () => {
  it(DivisorsActionTypes.SetDivisorsNumber, () => {
    divisorsActions.SET_DIVISORS_NUMBER(actionContext, 123);

    expect(actionContext.commit).toBeCalledWith(
      DivisorsMutationType.SetDivisorsNumber,
      123,
    );
  });

  it(DivisorsActionTypes.SetDivisorsSort, () => {
    divisorsActions.SET_DIVISORS_SORT(actionContext, SortOptions.Desc);

    expect(actionContext.commit).toBeCalledWith(
      DivisorsMutationType.SetDivisorsSort,
      SortOptions.Desc,
    );
  });

  it(DivisorsActionTypes.SetDivisorsOnlyProperDivisors, () => {
    divisorsActions.SET_DIVISORS_ONLY_PROPER_DIVISORS(actionContext, true);

    expect(actionContext.commit).toBeCalledWith(
      DivisorsMutationType.SetDivisorsOnlyProperDivisors,
      true,
    );
  });
});
