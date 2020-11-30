import { SortOptions } from '@/typings/enums';
import { parseNumber } from '@/helpers/number.helpers';

/**
 * Validates sort expression select list value
 * @param value Select list value
 * @returns {boolean} Validation result
 */
export function validateSortList(value: string): boolean {
  console.log('sort options', SortOptions as Record<string, string>);
  return Object.values(SortOptions as Record<string, string>).includes(value);
}

/**
 * Validates number input by parsing it as an integer
 * @param {string} value Number input value
 * @returns {[boolean, number?]} Validation result, parsed number array
 */
export function validateNumberInput(value: string): [boolean, number?] {
  const numberStrippedValue = value.replace(/\D/g, '');
  const parseResult = parseNumber(numberStrippedValue);

  return parseResult !== undefined ? [true, parseResult] : [false, undefined];
}

/**
 * Toggles input validation error messages according to its validity
 * @param {boolean} isValid Indicates input validity
 * @param {string} name input name
 */
export function toggleInputErrorText(isValid: boolean, name: string): void {
  const label = document.querySelector(`label[for="${name}"]`);
  if (!label) return;

  if (isValid === false) label.classList.add('error');
  else label.classList.remove('error');
}

/**
 * Toggles form validation error messages according to its validity
 * @param {boolean} isValid Indicates form validity
 * @param {string} id form identifier
 */
export function toggleFormErrorText(isValid: boolean, id: string): void {
  const span = document.querySelector(`span#${id}-error`);
  if (!span) return;

  if (isValid === false) span.classList.add('display');
  else span.classList.remove('display');
}
