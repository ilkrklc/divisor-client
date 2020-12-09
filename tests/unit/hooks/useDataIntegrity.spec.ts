import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import App from '@/App.vue';
import * as helpers from '@/helpers/persist.helpers';
import router from '@/router';

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
    const store = new Vuex.Store({
      getters: {
        getVersion: jest.fn(() => null),
      },
    });

    shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });

    await router.isReady();

    expect(setPersistedValueSpy).toHaveBeenCalled();
  });

  it('should reset stored data when major change occured', async () => {
    const store = new Vuex.Store({
      getters: {
        getVersion: jest.fn(() => '1.0.0'),
      },
    });

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
