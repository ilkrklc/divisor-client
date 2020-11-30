import RecentItem from '@/models/recent-item.model';

export type RecentState = {
  loading: boolean;
  items: RecentItem[];
};

export const recentState: RecentState = {
  loading: false,
  items: [],
};
