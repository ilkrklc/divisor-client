import {
  getPersistedValue,
  setPersistedValue,
} from '@/helpers/persist.helpers';
import { useStore } from '@/hooks/useStore';
import { PersistStateKey } from '@/typings/enums';
import semver from 'semver';
import { computed } from 'vue';

/**
 * Checks semantic versioning for data integrity
 */
export function useDataIntegrity(): void {
  /**
   * Vuex store
   */
  const store = useStore();

  /**
   * App version from package.json
   */
  const appVersion = computed(() => store.getters.getVersion);

  /**
   * Data version from local storage
   */
  const dataVersion = getPersistedValue(PersistStateKey.DataVersion);

  // app initial run set version number
  // or local storage not supported no harm in trying to set version number tough
  if (dataVersion === null) {
    setPersistedValue(PersistStateKey.DataVersion, appVersion.value);

    return;
  }

  // get version difference
  const diff = semver.diff(appVersion.value, dataVersion);

  // do nothing if change is not major
  if (diff !== 'major') return;

  // reset local storage data
  setPersistedValue(PersistStateKey.RecentItems, '');

  // set new version number
  setPersistedValue(PersistStateKey.DataVersion, appVersion.value);
}
