/**
 * Sort options contains not defined/asc/desc
 */
export enum SortOptions {
  NotDefined = 'not_defined',
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Calculation type between divisors and common divisors
 */
export enum CalculationType {
  Divisors = 'divisors',
  CommonDivisors = 'common_divisors',
}

/**
 * Form validation errors
 */
export enum ValidationErrors {
  NumberEmpty = 'Number input is required!',
  NumberNotValid = 'Please provide a natural number.',
  SortNotValid = 'Invalid sort expression.',
  CommonFormError = 'An unexpected error encountered. Please try again later.',
}

/**
 * Persisted data keys
 */
export enum PersistStateKey {
  RecentItems = 'VUEX_RECENT_ITEMS',
  DataVersion = 'DATA_VERSION',
}
