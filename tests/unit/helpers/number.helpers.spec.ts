import { parseNumber } from '@/helpers/number.helpers';

describe('parseNumber', () => {
  it('should return undefined when no number provided', () => {
    expect(parseNumber('no number')).toBe(undefined);
  });

  it('should return number when correct number provided', () => {
    expect(parseNumber('123')).toBe(123);
  });

  it('should return integer when decimal number provided', () => {
    expect(parseNumber('123.333')).toBe(123);
    expect(parseNumber('123,333')).toBe(123);
  });
});
