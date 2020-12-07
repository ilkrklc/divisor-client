import { mount } from '@vue/test-utils';

import { store } from '@/store';
import { GreetingActionTypes } from '@/store/modules/greeting/greeting.actions';

import Calculator from '@/components/Calculator.vue';

describe('rendering', () => {
  const wrapper = mount(Calculator, {
    global: {
      plugins: [store],
    },
  });

  const dispatchSpy = jest.spyOn(store, 'dispatch');

  beforeEach(() => {
    dispatchSpy.mockReset();
  });

  it('should go to common divisors tab', async () => {
    const tabItem = wrapper.find('.calculator-tab-item:last-child');
    const tabName = 'common_divisors';

    tabItem.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.activeTabName).toBe(tabName);
    expect(tabItem.element.classList.contains('active')).toBe(true);
    expect(wrapper.find('#common-divisors-form').exists()).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(
      GreetingActionTypes.SetCalculationTypeName,
      tabName,
    );
  });

  it('should return to divisors tab', async () => {
    const tabItem = wrapper.find('.calculator-tab-item:first-child');
    const tabName = 'divisors';

    tabItem.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.activeTabName).toBe(tabName);
    expect(tabItem.element.classList.contains('active')).toBe(true);
    expect(wrapper.find('#divisors-form').exists()).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(
      GreetingActionTypes.SetCalculationTypeName,
      tabName,
    );
  });
});
