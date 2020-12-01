import { RecentState, recentState } from '@/store/modules/recent/recent.state';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';
import {
  DivisorsState,
  divisorsState,
} from '@/store/modules/divisors/divisors.state';
import {
  CommonDivisorsState,
  commonDivisorsState,
} from '@/store/modules/common-divisors/common-divisors.state';

export type State = {
  recent: RecentState;
  greeting: GreetingState;
  divisors: DivisorsState;
  commonDivisors: CommonDivisorsState;
};

export const state: State = {
  recent: recentState,
  greeting: greetingState,
  divisors: divisorsState,
  commonDivisors: commonDivisorsState,
};
