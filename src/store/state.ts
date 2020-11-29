import { RecentState, recentState } from '@/store/modules/recent/recent.state';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';
import {
  DivisorsState,
  divisorsState,
} from '@/store/modules/divisors/divisors.state';

export type State = {
  recent: RecentState;
  greeting: GreetingState;
  divisors: DivisorsState;
};

export const state: State = {
  recent: recentState,
  greeting: greetingState,
  divisors: divisorsState,
};
