import { SortOptions, CalculationType } from '@/typings/enums';
import {
  getEnumValues,
  getSortOptionDisplayName,
  getCalculationTypeDisplayName,
} from '@/helpers/enum.helpers';

describe('getEnumValues', () => {
  it('should return values array', () => {
    enum TestStringEnum {
      key1 = 'value 1',
      key2 = 'value 2',
    }

    expect(
      getEnumValues<TestStringEnum, string>(TestStringEnum as never),
    ).toStrictEqual(['value 1', 'value 2']);
  });
});

describe('getSortOptionDisplayName', () => {
  it('should return correct display names', () => {
    expect(getSortOptionDisplayName(SortOptions.Asc)).toBe('Ascending');
    expect(getSortOptionDisplayName(SortOptions.Desc)).toBe('Descending');
    expect(getSortOptionDisplayName(SortOptions.NotDefined)).toBe('Ascending');
  });
});

describe('getCalculationTypeDisplayName', () => {
  it('should return correct display names', () => {
    expect(getCalculationTypeDisplayName(CalculationType.Divisors)).toBe(
      'divisors',
    );
    expect(getCalculationTypeDisplayName(CalculationType.CommonDivisors)).toBe(
      'common divisors',
    );
  });
});
