import { ActionContext } from 'vuex';

import {
  RecentActionTypes,
  recentActions,
} from '@/store/modules/recent/recent.actions';
import { RecentState, recentState } from '@/store/modules/recent/recent.state';
import { state, State } from '@/store/state';
import { RecentMutationType } from '@/store/modules/recent/recent.mutations';
import RecentItem from '@/models/recent-item.model';
import { CalculationType, PersistStateKey } from '@/typings/enums';
import { getFormattedDateString } from '@/helpers/date-time.helpers';
import * as persistHelpers from '@/helpers/persist.helpers';

describe('recent actions', () => {
  const actionContext: ActionContext<RecentState, State> = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    state: recentState,
    getters: {},
    rootState: state,
    rootGetters: {},
  };

  const getPersistedValueSpy = jest.spyOn(persistHelpers, 'getPersistedValue');
  const setPersistedValueSpy = jest.spyOn(persistHelpers, 'setPersistedValue');

  beforeEach(() => {
    actionContext.state.items = [];
    actionContext.commit = jest.fn();
    localStorage.setItem(PersistStateKey.RecentItems, '');
    getPersistedValueSpy.mockClear();
    setPersistedValueSpy.mockClear();
  });

  it(RecentActionTypes.AddItem, () => {
    const items = [
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '2', count: 1, number1: 1, divisors: [1] },
      { id: '3', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ] as RecentItem[];

    actionContext.state.items = items;

    const item = {
      id: '5',
      count: 1,
      number1: 1,
      divisors: [1],
      createdOn: getFormattedDateString(new Date()),
    } as RecentItem;

    recentActions.ADD_ITEM(actionContext, item);

    const newItems = [...[item], ...items];

    expect(setPersistedValueSpy).toBeCalledWith(
      PersistStateKey.RecentItems,
      JSON.stringify(newItems),
    );

    expect(actionContext.commit).toBeCalledWith(
      RecentMutationType.SetItems,
      newItems,
    );
  });

  it(RecentActionTypes.GetItems, () => {
    recentActions.GET_ITEMS(actionContext);

    expect(actionContext.commit).toBeCalledWith(
      RecentMutationType.SetItems,
      [],
    );

    const items = [
      {
        id: '1',
        count: 1,
        number1: 1,
        divisors: [1],
        createdOn: getFormattedDateString(new Date()),
        calculationType: CalculationType.Divisors,
        greatest: undefined,
        leastCommonMultiple: undefined,
        multiplication: undefined,
        number2: 0,
        onlyProperDivisors: false,
        smallest: undefined,
        sort: undefined,
        sum: undefined,
      },
    ] as RecentItem[];

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));

    recentActions.GET_ITEMS(actionContext);

    expect(getPersistedValueSpy).toBeCalledWith(PersistStateKey.RecentItems);

    expect(actionContext.commit).toBeCalledWith(
      RecentMutationType.SetItems,
      items,
    );
  });

  it(RecentActionTypes.RemoveItem, () => {
    actionContext.state.items = [
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '2', count: 1, number1: 1, divisors: [1] },
      { id: '3', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ] as RecentItem[];

    recentActions.REMOVE_ITEM(actionContext, '2');

    const newItems = [
      { id: '1', count: 1, number1: 1, divisors: [1] },
      { id: '3', count: 1, number1: 1, divisors: [1] },
      { id: '4', count: 1, number1: 1, divisors: [1] },
    ];

    expect(setPersistedValueSpy).toBeCalledWith(
      PersistStateKey.RecentItems,
      JSON.stringify(newItems),
    );

    expect(actionContext.commit).toBeCalledWith(
      RecentMutationType.SetItems,
      newItems,
    );
  });

  it(RecentActionTypes.ClearItems, () => {
    recentActions.CLEAR_ITEMS(actionContext);

    expect(actionContext.commit).toBeCalledWith(
      RecentMutationType.ClearItems,
      undefined,
    );
  });
});
