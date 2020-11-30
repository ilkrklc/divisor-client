import { RecentItem } from '@/typings/interfaces';

export type RecentState = {
  loading: boolean;
  items: RecentItem[];
};

export const recentState: RecentState = {
  loading: false,
  items: [],
};
