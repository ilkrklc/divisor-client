export interface RecentItem {
  calculationType: 'divisors' | 'common_divisors';
  divisors: number[];
  count: number;
  sum: number;
  multiplication: number;
  greatest: number;
  smallest: number;
}

export type RecentState = {
  loading: boolean;
  items: RecentItem[];
};

export const recentState: RecentState = {
  loading: false,
  items: [],
};
