import {
  commonDivisorsMutations,
  CommonDivisorsMutationType,
} from '@/store/modules/common-divisors/common-divisors.mutations';
import { commonDivisorsState } from '@/store/modules/common-divisors/common-divisors.state';
import { SortOptions } from '@/typings/enums';

describe('common divisors mutations', () => {
  it(CommonDivisorsMutationType.SetCommonDivisorNumber1, () => {
    commonDivisorsMutations.SET_COMMON_DIVISOR_NUMBER_ONE(
      commonDivisorsState,
      123,
    );

    expect(commonDivisorsState.form.number1).toBe(123);
  });

  it(CommonDivisorsMutationType.SetCommonDivisorNumber2, () => {
    commonDivisorsMutations.SET_COMMON_DIVISOR_NUMBER_TWO(
      commonDivisorsState,
      123,
    );

    expect(commonDivisorsState.form.number2).toBe(123);
  });

  it(CommonDivisorsMutationType.SetCommonDivisorSort, () => {
    commonDivisorsMutations.SET_COMMON_DIVISOR_SORT(
      commonDivisorsState,
      SortOptions.Asc,
    );

    expect(commonDivisorsState.form.sort).toBe(SortOptions.Asc);
  });
});
