import {
  divisorsMutations,
  DivisorsMutationType,
} from '@/store/modules/divisors/divisors.mutations';
import { divisorsState } from '@/store/modules/divisors/divisors.state';
import { SortOptions } from '@/typings/enums';

describe('divisors mutations', () => {
  it(DivisorsMutationType.SetDivisorsNumber, () => {
    divisorsMutations.SET_DIVISORS_NUMBER(divisorsState, 123);

    expect(divisorsState.form.number).toBe(123);
  });

  it(DivisorsMutationType.SetDivisorsSort, () => {
    divisorsMutations.SET_DIVISORS_SORT(divisorsState, SortOptions.Asc);

    expect(divisorsState.form.sort).toBe(SortOptions.Asc);
  });

  it(DivisorsMutationType.SetDivisorsOnlyProperDivisors, () => {
    divisorsMutations.SET_DIVISORS_ONLY_PROPER_DIVISORS(divisorsState, true);

    expect(divisorsState.form.onlyProperDivisors).toBe(true);
  });
});
