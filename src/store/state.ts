import { RecentState, recentState } from '@/store/modules/recent/recent.state';
import {
  GreetingState,
  greetingState,
} from '@/store/modules/greeting/greeting.state';

export type State = {
  recent: RecentState;
  greeting: GreetingState;
};

export const state: State = {
  recent: recentState,
  greeting: greetingState,
};
