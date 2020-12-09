import { mount } from '@vue/test-utils';

import router from '@/router';
import { store } from '@/store';
import { DivisorsActionTypes } from '@/store/modules/divisors/divisors.actions';
import * as helpers from '@/helpers/validation.helpers';
import { SortOptions } from '@/typings/enums';

import DivisorsForm from '@/components/DivisorsForm.vue';

const wrapper = mount(DivisorsForm, {
  global: {
    plugins: [store, router],
  },
});

const form = wrapper.find('#divisors-form');
const numberInput = wrapper.find('#number');
const sortInput = wrapper.find('#sort');

const toggleInputErrorTextSpy = jest.spyOn(helpers, 'toggleInputErrorText');
const toggleFormErrorTextSpy = jest.spyOn(helpers, 'toggleFormErrorText');
const validateNumberInputSpy = jest.spyOn(helpers, 'validateNumberInput');
const dispatchSpy = jest.spyOn(store, 'dispatch');

beforeEach(() => {
  toggleInputErrorTextSpy.mockClear();
  toggleFormErrorTextSpy.mockClear();
  validateNumberInputSpy.mockClear();
  dispatchSpy.mockClear();
});

describe('number input clean/dirty status', () => {
  it('number input should be clean when form initializes', () => {
    expect(wrapper.vm.isNumberInputDirty).toBe(false);
  });

  it('number input should be dirty when input event detected', () => {
    numberInput.trigger('input');

    expect(wrapper.vm.isNumberInputDirty).toBe(true);
  });

  it('number input should display error text when input are dirty', () => {
    wrapper.vm.isNumberInputDirty = false;
    form.trigger('submit');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(1);
  });

  it('number input should be clean when form successful submit happens', () => {
    numberInput.setValue('200');
    form.trigger('submit');

    expect(wrapper.vm.isNumberInputDirty).toBe(false);
  });
});

describe('number input events', () => {
  it('should validate input when input event detected', () => {
    numberInput.trigger('input');

    expect(validateNumberInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch action when input event detected', () => {
    numberInput.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      DivisorsActionTypes.SetDivisorsNumber,
      undefined,
    );
  });

  it('should toggle error text when input validation resulted false', () => {
    numberInput.setValue('asd');

    toggleInputErrorTextSpy.mockClear();

    numberInput.trigger('input');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(1);
  });
});

describe('sort input events', () => {
  it('should validate input when change event detected', () => {
    const validateSortListSpy = jest.spyOn(helpers, 'validateSortList');

    sortInput.trigger('change');

    expect(validateSortListSpy).toHaveBeenCalledTimes(1);

    validateSortListSpy.mockClear();
  });

  it('should dispatch action when change event detected', () => {
    sortInput.setValue(SortOptions.Asc);

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    sortInput.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      DivisorsActionTypes.SetDivisorsSort,
      SortOptions.Asc,
    );

    dispatchSpy.mockClear();
  });

  it('should reset input when input validation resulted false', () => {
    sortInput.setValue('asd');

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    sortInput.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      DivisorsActionTypes.SetDivisorsSort,
      SortOptions.NotDefined,
    );

    dispatchSpy.mockClear();
  });
});

describe('submit event', () => {
  it('should display number input error when input validation resulted false', () => {
    numberInput.setValue('asd');

    toggleInputErrorTextSpy.mockClear();

    form.trigger('submit');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch recent item when successful submit event happens', () => {
    numberInput.setValue('63');

    dispatchSpy.mockClear();

    form.trigger('submit');

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
