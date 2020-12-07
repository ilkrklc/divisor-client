import RecentItem from '@/models/recent-item.model';
import {
  recentMutations,
  RecentMutationType,
} from '@/store/modules/recent/recent.mutations';
import { recentState } from '@/store/modules/recent/recent.state';

describe('recent mutations', () => {
  it(RecentMutationType.SetItems, () => {
    const item = { id: '1', count: 1, number1: 1, divisors: [1] } as RecentItem;

    recentMutations.SET_ITEMS(recentState, [item]);

    expect(recentState.items).toStrictEqual([item]);
  });

  it(RecentMutationType.RemoveItem, () => {
    recentState.items = [
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '2', count: 1, number1: 1, divisors: [1] },
      { id: '3', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ] as RecentItem[];

    recentMutations.REMOVE_ITEM(recentState, '3');

    expect(recentState.items).toStrictEqual([
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '2', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ] as RecentItem[]);
  });

  it(RecentMutationType.ClearItems, () => {
    recentState.items = [
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '2', count: 1, number1: 1, divisors: [1] },
      { id: '3', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ] as RecentItem[];

    recentMutations.CLEAR_ITEMS(recentState);

    expect(recentState.items.length).toBe(0);
  });
});
