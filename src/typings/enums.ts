export enum SortOptions {
  NotDefined = 'not_defined',
  Asc = 'asc',
  Desc = 'desc',
}

export enum CalculationType {
  Divisors = 'divisors',
  CommonDivisors = 'common_divisors',
}

export enum ValidationErrors {
  NumberEmpty = 'Number input is required!',
  NumberNotValid = 'Please provide a natural number.',
  SortNotValid = 'Invalid sort expression.',
  CommonFormError = 'An unexpected error encountered. Please try again later.',
}

export enum PersistStateKey {
  RecentItems = 'VUEX_RECENT_ITEMS',
}
