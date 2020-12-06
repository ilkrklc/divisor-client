import { shallowMount } from '@vue/test-utils';

import { CalculationType, SortOptions } from '@/typings/enums';
import RecentItemModel from '@/models/recent-item.model';

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
  smallest: 1,
  number1: 1,
};

describe('name rendering', () => {
  it('name takes divisors class when provided result is for divisors', () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
    });

    expect(
      wrapper
        .find('.recent-item-name')
        .element.classList.contains(`${CalculationType.Divisors}-recent-item`),
    ).toBe(true);
  });

  it('name takes common divisors class when provided result is for common divisors', () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.CommonDivisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
    });

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
  it('should not display any badges when recent item has no sort or proper option', () => {
    const item = baseModel.deserialize({
      ...baseSerializedModel,
      calculationType: CalculationType.Divisors,
    });

    const wrapper = shallowMount(RecentItem, {
      props: {
        item,
      },
    });

    expect(wrapper.vm.recentItem.sort).toBe(SortOptions.NotDefined);
    expect(wrapper.find('.recent-item-badge').exists()).toBe(false);
  });

  it('should display sort badge when recent item has sort option', () => {
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
    });

    expect(wrapper.vm.recentItem.sort).toBe(SortOptions.Asc);
    expect(
      wrapper.find('.recent-item-badges').element.children.length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('should display proper badge when recent item has proper option', () => {
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
    });

    expect(wrapper.vm.recentItem.onlyProperDivisors).toBe(true);
    expect(
      wrapper.find('.recent-item-badges').element.children.length,
    ).toBeGreaterThanOrEqual(1);
  });
});

describe('divisors rendering', () => {
  it('should render no result message when recent item has no divisors result', () => {
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
    });

    expect(wrapper.vm.recentItem.count).toBe(0);
    expect(wrapper.find('span.no-result').exists()).toBe(true);
  });
});
