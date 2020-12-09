import {
  validateNumberInput,
  validateSortList,
  toggleInputErrorText,
  toggleFormErrorText,
} from '@/helpers/validation.helpers';

describe('validateNumberInput', () => {
  it('should return false for no number values', () => {
    expect(validateNumberInput('no_number')).toStrictEqual([false, undefined]);
  });

  it('should return true for number values', () => {
    expect(validateNumberInput('123')).toStrictEqual([true, 123]);
  });

  it('should return true and remove separator for decimal values', () => {
    expect(validateNumberInput('123.333')).toStrictEqual([true, 123333]);
    expect(validateNumberInput('123,333')).toStrictEqual([true, 123333]);
  });
});

describe('validateSortList', () => {
  it('should return false if value is not a sort option', () => {
    expect(validateSortList('not_sort_expression')).toBe(false);
  });

  it('should return true if value is a sort option', () => {
    expect(validateSortList('asc')).toBe(true);
  });
});

describe('toggleInputErrorText', () => {
  const inputId = 'test-element';

  describe('valid input state', () => {
    beforeEach(() => {
      document.body.innerHTML = `
          <div>
            <label for="${inputId}">
              <input type="text" name="${inputId}" id="${inputId}" />
            </label>
          </div>
        `;
    });

    it('should add error class when no error class exists', () => {
      toggleInputErrorText(false, inputId);

      expect(document.querySelector('label')?.classList.contains('error')).toBe(
        true,
      );
    });

    it('should not add error class when input valid', () => {
      toggleInputErrorText(true, inputId);

      expect(document.querySelector('label')?.classList.contains('error')).toBe(
        false,
      );
    });

    it('should add error class when input faulty', () => {
      toggleInputErrorText(false, inputId);

      expect(document.querySelector('label')?.classList.contains('error')).toBe(
        true,
      );
    });
  });

  describe('error input state', () => {
    beforeEach(() => {
      document.body.innerHTML = `
          <div>
            <label class="error" for="${inputId}">
              <input type="text" name="${inputId}" id="${inputId}" />
            </label>
          </div>
        `;
    });

    it('should remove error class when input valid', () => {
      toggleInputErrorText(true, inputId);

      expect(document.querySelector('label')?.classList.contains('error')).toBe(
        false,
      );
    });
  });
});

describe('toggleFormErrorText', () => {
  const formId = 'test-form';

  it('should add error class when form error encountered', () => {
    document.body.innerHTML = `
          <div>
            <span id="${formId}-error"></span>
          </div>
        `;

    toggleFormErrorText(false, formId);

    expect(document.querySelector('span')?.classList.contains('display')).toBe(
      true,
    );
  });

  it('should remove error class when form error resolved', () => {
    document.body.innerHTML = `
          <div>
            <span id="${formId}-error" class="display"></span>
          </div>
        `;

    toggleFormErrorText(true, formId);

    expect(document.querySelector('span')?.classList.contains('display')).toBe(
      false,
    );
  });
});
