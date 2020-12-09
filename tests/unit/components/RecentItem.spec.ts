import { shallowMount } from '@vue/test-utils';

import { CalculationType, SortOptions } from '@/typings/enums';
import RecentItemModel from '@/models/recent-item.model';
import { store } from '@/store';
import router from '@/router';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';

import RecentItem from '@/components/RecentItem.vue';

const sharedParams = {
  number1: 1,
  id: '1',
};

const baseModel = new RecentItemModel({
  ...sharedParams,
  sort: SortOptions.NotDefined,
});

const baseSerializedModel = {
  id: '1',
  divisors: [1],
  count: 1,
  sum: 1,
  multiplication: 1,
  greatest: 1,
  number1: 1,
};

describe('name rendering', () => {
  it('name takes divisors class when provided result is for divisors', async () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(
      wrapper
        .find('.recent-item-name')
        .element.classList.contains(`${CalculationType.Divisors}-recent-item`),
    ).toBe(true);
  });

  it('name takes common divisors class when provided result is for common divisors', async () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.CommonDivisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(
      wrapper
        .find('.recent-item-name')
        .element.classList.contains(
          `${CalculationType.CommonDivisors}-recent-item`,
        ),
    ).toBe(true);
  });
});

describe('badge rendering', () => {
  it('should not display any badges when recent item has no sort or proper option', async () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(wrapper.vm.recentItem.sort).toBe(SortOptions.NotDefined);
    expect(wrapper.find('.recent-item-badge').exists()).toBe(false);
  });

  it('should display sort badge when recent item has sort option', async () => {
    const item = new RecentItemModel({
      ...sharedParams,
      sort: SortOptions.Asc,
    }).deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(wrapper.vm.recentItem.sort).toBe(SortOptions.Asc);
    expect(
      wrapper.find('.recent-item-badges').element.children.length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('should display proper badge when recent item has proper option', async () => {
    const item = new RecentItemModel({
      ...sharedParams,
      sort: SortOptions.Asc,
      onlyProperDivisors: true,
    }).deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(wrapper.vm.recentItem.onlyProperDivisors).toBe(true);
    expect(
      wrapper.find('.recent-item-badges').element.children.length,
    ).toBeGreaterThanOrEqual(1);
  });
});

describe('divisors rendering', () => {
  it('should render no result message when recent item has no divisors result', async () => {
    const item = new RecentItemModel({
      ...sharedParams,
      sort: SortOptions.Asc,
      onlyProperDivisors: true,
    }).deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
      divisors: [],
      count: 0,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    expect(wrapper.vm.recentItem.count).toBe(0);
    expect(wrapper.find('div.no-result').exists()).toBe(true);
  });
});

describe('divisor removal', () => {
  it('should dispatch recent item remove action when remove event called', async () => {
    const item = new RecentItemModel({
      ...sharedParams,
      sort: SortOptions.Asc,
    }).deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
      global: { plugins: [store, router] },
    });

    await router.isReady();

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    wrapper.find('button.recent-item-remove-button').trigger('click');

    expect(dispatchSpy).toBeCalledWith(RecentActionTypes.RemoveItem, '1');
  });
});
