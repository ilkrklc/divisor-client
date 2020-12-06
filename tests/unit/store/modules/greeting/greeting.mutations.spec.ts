import {
  greetingMutations,
  GreetingMutationType,
} from '@/store/modules/greeting/greeting.mutations';
import { greetingState } from '@/store/modules/greeting/greeting.state';
import { CalculationType } from '@/typings/enums';

describe('greeting mutations', () => {
  it(GreetingMutationType.SetCalculationTypeName, () => {
    greetingMutations.SET_CALCULATION_TYPE_NAME(
      greetingState,
      CalculationType.CommonDivisors,
    );

    expect(greetingState.calculationTypeName).toBe(
      CalculationType.CommonDivisors,
    );
  });
});
