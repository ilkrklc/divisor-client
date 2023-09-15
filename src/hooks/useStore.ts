import { Store } from '@/store';
import { useStore as VuexStore } from 'vuex';

/**
 * Gets vuex store instance
 */
export function useStore(): Store {
  return VuexStore() as Store;
}
