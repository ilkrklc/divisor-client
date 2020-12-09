import { computed } from 'vue';
import semver from 'semver';

import { useStore } from '@/hooks/useStore';
import {
<<<<<<< HEAD
  getPersistedValue,
  setPersistedValue,
=======
  getPersistedJsonValue,
  setPersistedJsonValue,
>>>>>>> main
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
<<<<<<< HEAD
  const dataVersion = getPersistedValue(PersistStateKey.DataVersion);
=======
  const dataVersion = getPersistedJsonValue(PersistStateKey.DataVersion);
>>>>>>> main

  // app initial run set version number
  // or local storage not supported no harm in trying to set version number tough
  if (dataVersion === null) {
<<<<<<< HEAD
    setPersistedValue(PersistStateKey.DataVersion, appVersion.value);
=======
    setPersistedJsonValue(PersistStateKey.DataVersion, appVersion.value);
>>>>>>> main

    return;
  }

  // get version difference
  const diff = semver.diff(appVersion.value, dataVersion);

  // do nothing if change is not major
  if (diff !== 'major') return;

  // reset local storage data
<<<<<<< HEAD
  setPersistedValue(PersistStateKey.RecentItems, '');

  // set new version number
  setPersistedValue(PersistStateKey.DataVersion, appVersion.value);
=======
  setPersistedJsonValue(PersistStateKey.RecentItems, '');

  // set new version number
  setPersistedJsonValue(PersistStateKey.DataVersion, appVersion.value);
>>>>>>> main
}
