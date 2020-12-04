import RecentItem from '@/models/recent-item.model';

export type RecentState = {
  items: RecentItem[];
};

export const recentState: RecentState = {
  items: [],
};
