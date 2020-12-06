import { mount } from '@vue/test-utils';

import { store } from '@/store';
import { PersistStateKey } from '@/typings/enums';
import { INFINITE_SCROLL_PAGE_SIZE } from '@/helpers/constants';

import Recent from '@/components/Recent.vue';

describe('render with no items', () => {
  it('should render no items message when recent items list empty', () => {
    const wrapper = mount(Recent, { global: { plugins: [store] } });

    expect(wrapper.vm.hasRecentCalculations).toBe(false);
    expect(wrapper.find('.no-results').exists()).toBe(true);
  });
});

describe('render with items', () => {
  it('should render recent item components when recent items list not empty', () => {
    const items = [
      { id: '1', number1: 1, count: 1, divisors: [1] },
      { id: '2', number1: 1, count: 1, divisors: [1] },
      { id: '3', number1: 1, count: 1, divisors: [1] },
    ];

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));
    const wrapper = mount(Recent, { global: { plugins: [store] } });

    expect(wrapper.findAll('.recent-item').length).toBe(items.length);
  });

  it('should not paginate items when items length is below threshold', () => {
    localStorage.setItem(
      PersistStateKey.RecentItems,
      JSON.stringify([
        { id: '1', number1: 1, count: 1, divisors: [1] },
        { id: '2', number1: 1, count: 1, divisors: [1] },
        { id: '3', number1: 1, count: 1, divisors: [1] },
      ]),
    );
    const wrapper = mount(Recent, { global: { plugins: [store] } });

    expect(wrapper.vm.items.length).toEqual(wrapper.vm.pagedRecentItems.length);
  });

  it('should not paginate items when items length is below threshold', async () => {
    const items = [
      { id: '1', number1: 1, count: 1, divisors: [1] },
      { id: '2', number1: 1, count: 1, divisors: [1] },
      { id: '3', number1: 1, count: 1, divisors: [1] },
      { id: '4', number1: 1, count: 1, divisors: [1] },
      { id: '5', number1: 1, count: 1, divisors: [1] },
      { id: '6', number1: 1, count: 1, divisors: [1] },
      { id: '7', number1: 1, count: 1, divisors: [1] },
      { id: '8', number1: 1, count: 1, divisors: [1] },
      { id: '9', number1: 1, count: 1, divisors: [1] },
    ];

    localStorage.setItem(PersistStateKey.RecentItems, JSON.stringify(items));

    const wrapper = mount(Recent, { global: { plugins: [store] } });

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
});
