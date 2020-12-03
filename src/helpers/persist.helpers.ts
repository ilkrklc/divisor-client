/**
 * Checks for locale storage support
 */
function isLocaleStorageExists(): boolean {
  try {
    const testKeyValue = 'test';
    localStorage.setItem(testKeyValue, testKeyValue);
    localStorage.removeItem(testKeyValue);

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Gets stored value in locale storage by provided key
 * @param {string} key Locale store key
 * @return {string | null} Value if key found null if not
 */
export function getPersistedJsonValue(key: string): string | null {
  // if key is faulty return null
  if (!key) return null;

  // check for locale storage return null if not exists
  if (isLocaleStorageExists() === false) return null;

  // return value stored with provided key
  return localStorage.getItem(key);
}

/**
 * Upsert value to provided key in locale storage. Deletes key if value is empty.
 * @param {string} key Locale store key
 * @param {string} value Serialized data
 */
export function setPersistedJsonValue(key: string, value: string): void {
  // if key is faulty do nothing
  if (!key) return;

  // check for locale storage do nothing if not exists
  if (isLocaleStorageExists() === false) return;

  // if value is empty remove stored item
  if (value === '') {
    localStorage.removeItem(key);

    return;
  }

  // upsert value
  localStorage.setItem(key, value);
}
