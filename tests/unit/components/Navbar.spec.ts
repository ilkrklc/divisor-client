import { mount } from '@vue/test-utils';

import { store } from '@/store';
import router from '@/router';

import Navbar from '@/components/Navbar.vue';

const wrapper = mount(Navbar, { global: { plugins: [store, router] } });

describe('link rendering', () => {
  it('should render links correct', async () => {
    await router.isReady();

    const logo = wrapper.find('#navbar-name');
    const links = wrapper.find('.navbar-links').element.children;

    expect(logo.element.tagName).toBe('A');
    expect(logo.element.getAttribute('href')).toBe('/');

    expect(links[0].tagName).toBe('A');
    expect(links[0].getAttribute('href')).toBe('/');

    expect(links[1].tagName).toBe('A');
    expect(links[1].getAttribute('href')).toBe('/about');
  });
});

describe('github logo events', () => {
  const githubLogo = wrapper.find('#navbar-github');

  beforeEach(async () => {
    githubLogo.trigger('mouseenter');

    await wrapper.vm.$nextTick();
  });

  it('should animate navbar area when mouseenter event happens', () => {
    expect(wrapper.vm.isGitLogoHovered).toBe(true);
    expect(githubLogo.element.classList.contains('hovered')).toBe(true);
  });

  it('should animate navbar area when mouseleave event happens', async () => {
    githubLogo.trigger('mouseleave');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isGitLogoHovered).toBe(false);
    expect(githubLogo.element.classList.contains('hovered')).toBe(false);
  });
});
