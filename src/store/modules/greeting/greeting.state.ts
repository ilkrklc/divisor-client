import { CalculationType } from '@/typings/enums';

export type GreetingState = {
  calculationTypeName: CalculationType;
};

export const greetingState: GreetingState = {
  calculationTypeName: CalculationType.Divisors,
};
