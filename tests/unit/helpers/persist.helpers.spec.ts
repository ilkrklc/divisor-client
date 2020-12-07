/* eslint-disable no-global-assign */

import {
  isLocaleStorageExists,
  getPersistedValue,
  setPersistedValue,
} from '@/helpers/persist.helpers';

const storage = localStorage;

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  });
});

describe('getPersistedValue', () => {
  it('should return null when local storage not supported', () => {
    Object.defineProperty(window, 'localStorage', { value: null });

    expect(getPersistedValue('test-key')).toBe(null);
  });

  it('should return null when key not found', () => {
    expect(getPersistedValue('test-key')).toBe(null);
  });

  it('should return value when key found', () => {
    localStorage.setItem('test-key', 'test-value');

    expect(getPersistedValue('test-key')).toBe('test-value');
  });
});

describe('setPersistedValue', () => {
  beforeEach(() => {
    localStorage.setItem('test-key', 'test-value');
  });

  it('should remove locale storage item if value is empty', () => {
    setPersistedValue('test-key', '');

    expect(localStorage.getItem('test-key')).toBe(null);
  });

  it('should set locale storage item if value not empty', () => {
    setPersistedValue('test-key', 'test-value-2');

    expect(localStorage.getItem('test-key')).toBe('test-value-2');
  });
});

describe('isLocaleStorageExists', () => {
  it('should return true when local storage supported', () => {
    expect(isLocaleStorageExists()).toBe(true);
  });

  it('should return false when local storage not supported', () => {
    Object.defineProperty(window, 'localStorage', { value: null });

    expect(isLocaleStorageExists()).toBe(false);
  });
});
