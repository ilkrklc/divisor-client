/* eslint-disable @typescript-eslint/no-explicit-any */

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { mount } from '@vue/test-utils';

describe('useScrollPosition', () => {
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

  it('should react when scroll event detected', async () => {
    let scrollPosition;
    let scrollOffset;

    const component = mountComposition(() => {
      ({ scrollPosition, scrollOffset } = useScrollPosition());
    });

    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
    window.dispatchEvent(new UIEvent('scroll'));

    await component.vm.$nextTick();
    expect((scrollPosition as any).value).not.toEqual(0);
    expect((scrollOffset as any).value).not.toEqual(0);
  });

  it('should calculate scroll position correct when scroll event detected', async () => {
    let scrollPosition;

    const component = mountComposition(() => {
      ({ scrollPosition } = useScrollPosition());
    });

    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
    window.dispatchEvent(new UIEvent('scroll'));

    await component.vm.$nextTick();
    expect((scrollPosition as any).value).toEqual(600);
  });

  it('should calculate scroll offset correct when scroll event detected', async () => {
    let scrollOffset;

    const component = mountComposition(() => {
      ({ scrollOffset } = useScrollPosition());
    });

    document.body.scrollTop = 600;
    document.documentElement.scrollTop = 600;
    window.dispatchEvent(new UIEvent('scroll'));

    await component.vm.$nextTick();

    const viewportHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    );
    const documentHeight = document.body.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    expect((scrollOffset as any).value).toEqual(
      documentHeight - (scrollTop + viewportHeight),
    );
  });
});
