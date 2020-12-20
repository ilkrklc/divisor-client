import { shallowMount } from '@vue/test-utils';

import Greeting from '@/components/Greeting.vue';
import { store } from '@/store';

describe('rendering', () => {
  it('should render props right', async () => {
    const wrapper = shallowMount(Greeting, {
      global: {
        plugins: [store],
      },
    });

    expect(['divisors', 'common divisors']).toContain(
      wrapper.find('b').text(),
    );
  });
});
