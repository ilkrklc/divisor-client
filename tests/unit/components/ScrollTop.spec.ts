import { shallowMount } from '@vue/test-utils';

import ScrollTop from '@/components/ScrollTop.vue';

describe('rendering', () => {
  const wrapper = shallowMount(ScrollTop);
  beforeEach(async () => {
    // simulate scroll event
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
    window.dispatchEvent(new UIEvent('scroll'));

    await wrapper.vm.$nextTick();
  });

  afterEach(async () => {
    // clear scroll
    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
    window.dispatchEvent(new UIEvent('scroll'));

    await wrapper.vm.$nextTick();
  });

  it('should display when scroll offset threshold passed', () => {
    expect(wrapper.vm.displayScrollTopButton).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should scroll to top when button clicked', async () => {
    // trigger click
    wrapper.find('button').trigger('click');

    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);

    window.dispatchEvent(new UIEvent('scroll'));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').exists()).toBe(false);
  });
});
