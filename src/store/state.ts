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
import { RootState, rootState } from '@/store/modules/root/root.state';

export type State = {
  version: string;
  recent: RecentState;
  greeting: GreetingState;
  divisors: DivisorsState;
  commonDivisors: CommonDivisorsState;
  root: RootState;
};

export const state: State = {
  version: '',
  recent: recentState,
  greeting: greetingState,
  divisors: divisorsState,
  commonDivisors: commonDivisorsState,
  root: rootState,
};
