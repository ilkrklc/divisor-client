import { ActionContext } from 'vuex';

import {
  CommonDivisorsActionTypes,
  commonDivisorsActions,
} from '@/store/modules/common-divisors/common-divisors.actions';
import {
  CommonDivisorsState,
  commonDivisorsState,
} from '@/store/modules/common-divisors/common-divisors.state';
import { state, State } from '@/store/state';
import { CommonDivisorsMutationType } from '@/store/modules/common-divisors/common-divisors.mutations';
import { SortOptions } from '@/typings/enums';

// Provide full action context
const actionContext: ActionContext<CommonDivisorsState, State> = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: commonDivisorsState,
  getters: {},
  rootState: state,
  rootGetters: {},
};

describe('common divisors actions', () => {
  it(CommonDivisorsActionTypes.SetCommonDivisorNumber1, () => {
    commonDivisorsActions.SET_COMMON_DIVISOR_NUMBER_ONE(actionContext, 123);

    expect(actionContext.commit).toBeCalledWith(
      CommonDivisorsMutationType.SetCommonDivisorNumber1,
      123,
    );
  });

  it(CommonDivisorsActionTypes.SetCommonDivisorNumber2, () => {
    commonDivisorsActions.SET_COMMON_DIVISOR_NUMBER_TWO(actionContext, 223);

    expect(actionContext.commit).toBeCalledWith(
      CommonDivisorsMutationType.SetCommonDivisorNumber2,
      223,
    );
  });

  it(CommonDivisorsActionTypes.SetCommonDivisorSort, () => {
    commonDivisorsActions.SET_COMMON_DIVISOR_SORT(
      actionContext,
      SortOptions.Desc,
    );

    expect(actionContext.commit).toBeCalledWith(
      CommonDivisorsMutationType.SetCommonDivisorSort,
      SortOptions.Desc,
    );
  });
});
