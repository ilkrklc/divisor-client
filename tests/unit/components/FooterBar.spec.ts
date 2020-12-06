import { shallowMount } from '@vue/test-utils';

import FooterBar from '@/components/FooterBar.vue';

describe('rendering', () => {
  it('should render year correct', async () => {
    const wrapper = shallowMount(FooterBar);

    expect(wrapper.find('span').text()).toContain(new Date().getUTCFullYear());
  });
});
