import { shallowMount } from '@vue/test-utils';

import App from '@/App.vue';
import * as helpers from '@/helpers/persist.helpers';
import { store, router } from '@/../mocks/vue-plugins.mock';

describe('useDataIntegrity', () => {
  let getPersistedValueSpy: jest.SpyInstance;
  let setPersistedValueSpy: jest.SpyInstance;

  beforeEach(() => {
    getPersistedValueSpy = jest.spyOn(helpers, 'getPersistedValue');
    setPersistedValueSpy = jest.spyOn(helpers, 'setPersistedValue');
  });

  afterEach(() => {
    getPersistedValueSpy.mockClear();
    setPersistedValueSpy.mockClear();
  });

  it('should set version if no version already stored', async () => {
    shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });

    await router.isReady();

    expect(setPersistedValueSpy).toHaveBeenCalled();
  });

  it('should reset stored data when major change occured', async () => {
    getPersistedValueSpy.mockImplementation(() => '0.0.1');

    shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });

    await router.isReady();

    expect(setPersistedValueSpy).toHaveBeenCalledTimes(2);
  });
});
