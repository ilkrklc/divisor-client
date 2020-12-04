import { computed } from 'vue';
import semver from 'semver';

import { useStore } from '@/hooks/useStore';
import {
  getPersistedJsonValue,
  setPersistedJsonValue,
} from '@/helpers/persist.helpers';
import { PersistStateKey } from '@/typings/enums';

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
  const dataVersion = getPersistedJsonValue(PersistStateKey.DataVersion);

  // app initial run set version number
  // or local storage not supported no harm in trying to set version number tough
  if (dataVersion === null) {
    setPersistedJsonValue(PersistStateKey.DataVersion, appVersion.value);

    return;
  }

  // get version difference
  const diff = semver.diff(appVersion.value, dataVersion);

  // do nothing if change is not major
  if (diff !== 'major') return;

  // reset local storage data
  setPersistedJsonValue(PersistStateKey.RecentItems, '');

  // set new version number
  setPersistedJsonValue(PersistStateKey.DataVersion, appVersion.value);
}
