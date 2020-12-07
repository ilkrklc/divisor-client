/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSortOptions } from '@/hooks/useSortOptions';
import { mount } from '@vue/test-utils';

describe('useSortOptions', () => {
  const mountComposition = (cb: () => any) => {
    return mount({
      setup() {
        return cb();
      },
      render() {
        return null;
      },
    });
  };

  it('should render sort options correctly', async () => {
    let options;

    const component = mountComposition(() => {
      options = useSortOptions();
    });

    await component.vm.$nextTick();

    expect(options).toStrictEqual([
      { text: 'Please select...', value: 'not_defined' },
      { text: 'Ascending', value: 'asc' },
      { text: 'Descending', value: 'desc' },
    ]);
  });
});
