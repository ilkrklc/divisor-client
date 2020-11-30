/**
 * Gets enum values as provided return type
 * @param {T} Enum Enum object
 * @template T Enum generic template
 * @returns {string[] | number[]} Enum values as provided type
 */
export function getEnumValues<
  T extends { [key: number]: string | number },
  R = string | number
>(Enum: T): R[] {
  const keys = Object.keys(Enum).filter(
    k => typeof Enum[k as keyof T] === 'string',
  );
  const values = keys.map(k => (Enum[k as keyof T] as unknown) as R);

  return values;
}
