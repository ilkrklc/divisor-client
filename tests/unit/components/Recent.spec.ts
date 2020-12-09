import { mount } from '@vue/test-utils';

import { store } from '@/store';
import router from '@/router';
import { CalculationType, PersistStateKey } from '@/typings/enums';
import { INFINITE_SCROLL_PAGE_SIZE } from '@/helpers/constants';
import RecentItem from '@/models/recent-item.model';

import Recent from '@/components/Recent.vue';

function generateItems(limit: number): RecentItem[] {
  const result: RecentItem[] = [];
  for (let i = 1; i <= limit; i++)
    result.push({
      id: `'${i}'`,
      number1: 1,
      number2: 0,
      count: 1,
      divisors: [1],
      calculationType: CalculationType.CommonDivisors,
      sum: 1,
      multiplication: 1,
      createdOn: new Date().toLocaleString(),
      onlyProperDivisors: false,
      deserialize: jest.fn(),
      fromCalculationResult: jest.fn(),
    });

  return result;
}

describe('render with no items', () => {
  it('should render no items message when recent items list empty', () => {
    const wrapper = mount(Recent, { global: { plugins: [store, router] } });

    expect(wrapper.vm.hasRecentCalculations).toBe(false);
    expect(wrapper.find('.no-results').exists()).toBe(true);
  });
});

describe('render with items', () => {
  it('should render recent item components when recent items list not empty', () => {
    const items = generateItems(3);

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));
    const wrapper = mount(Recent, { global: { plugins: [store, router] } });

    expect(wrapper.findAll('.recent-item').length).toBe(items.length);
  });

  it('should not paginate items when items length is below threshold', () => {
    localStorage.setItem(
      PersistStateKey.RecentItems,
      JSON.stringify(generateItems(3)),
    );
    const wrapper = mount(Recent, { global: { plugins: [store, router] } });

    expect(wrapper.vm.items.length).toEqual(wrapper.vm.pagedRecentItems.length);
  });

  it('should paginate more items when scrolled to the bottom of the page', async () => {
    const items = generateItems(9);

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));

    const wrapper = mount(Recent, { global: { plugins: [store, router] } });

    // all items length and paged items length should not be equal
    expect(wrapper.vm.items.length).not.toEqual(
      wrapper.vm.pagedRecentItems.length,
    );

    // paged items length should be page size
    expect(wrapper.vm.pagedRecentItems.length).toBe(INFINITE_SCROLL_PAGE_SIZE);

    // scroll into bottom of the page
    const documentHeight = document.body.clientHeight;
    document.body.scrollTop = documentHeight;
    document.documentElement.scrollTop = documentHeight;
    window.dispatchEvent(new UIEvent('scroll'));

    // wait component react to changes
    wrapper.vm.$nextTick();

    // paged items list should be extended
    expect(wrapper.vm.pagedRecentItems.length).toBeGreaterThan(
      INFINITE_SCROLL_PAGE_SIZE,
    );
  });

  it('should remove all items when clear all button clicked', () => {
    const items = generateItems(3);

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));

    const wrapper = mount(Recent, { global: { plugins: [store, router] } });

    wrapper.find('button.recent-action.danger').trigger('click');

    // wait component react to changes
    wrapper.vm.$nextTick();

    expect(wrapper.vm.pagedRecentItems.length).toBe(0);
    expect(wrapper.vm.hasRecentCalculations).toBe(false);
  });
});
