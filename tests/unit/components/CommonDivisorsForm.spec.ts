import { mount } from '@vue/test-utils';

import { store } from '@/store';
import { CommonDivisorsActionTypes } from '@/store/modules/common-divisors/common-divisors.actions';
import * as helpers from '@/helpers/validation.helpers';
import { SortOptions } from '@/typings/enums';

import CommonDivisorsForm from '@/components/CommonDivisorsForm.vue';

const wrapper = mount(CommonDivisorsForm, {
  global: {
    plugins: [store],
  },
});

const form = wrapper.find('#common-divisors-form');
const numberInput1 = wrapper.find('#number1');
const numberInput2 = wrapper.find('#number2');
const sortInput = wrapper.find('#sort');

const toggleInputErrorTextSpy = jest.spyOn(helpers, 'toggleInputErrorText');
const validateNumberInputSpy = jest.spyOn(helpers, 'validateNumberInput');
const dispatchSpy = jest.spyOn(store, 'dispatch');

beforeEach(() => {
  toggleInputErrorTextSpy.mockClear();
  validateNumberInputSpy.mockClear();
  dispatchSpy.mockClear();
});

describe('number inputs clean/dirty status', () => {
  it('number inputs should be clean when form initializes', () => {
    expect(wrapper.vm.isNumber1InputDirty).toBe(false);
    expect(wrapper.vm.isNumber2InputDirty).toBe(false);
  });

  it('number inputs should be dirty when input event detected', () => {
    numberInput1.trigger('input');
    numberInput2.trigger('input');

    expect(wrapper.vm.isNumber1InputDirty).toBe(true);
    expect(wrapper.vm.isNumber2InputDirty).toBe(true);
  });

  it('number inputs should display error text when inputs are dirty', () => {
    wrapper.vm.isNumber1InputDirty = false;
    wrapper.vm.isNumber2InputDirty = false;
    form.trigger('submit');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(2);
  });

  it('number inputs should be clean when form successful submit happens', () => {
    numberInput1.setValue('200');
    numberInput2.setValue('20');
    form.trigger('submit');

    expect(wrapper.vm.isNumber1InputDirty).toBe(false);
    expect(wrapper.vm.isNumber2InputDirty).toBe(false);
  });
});

describe('number input events', () => {
  it('should validate inputs when input event detected', () => {
    numberInput1.trigger('input');
    numberInput2.trigger('input');

    expect(validateNumberInputSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch action when input event detected', () => {
    numberInput1.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      CommonDivisorsActionTypes.SetCommonDivisorNumber1,
      undefined,
    );

    numberInput2.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      CommonDivisorsActionTypes.SetCommonDivisorNumber2,
      undefined,
    );
  });

  it('should toggle error text when input validations resulted false', () => {
    numberInput1.setValue('asd');
    numberInput2.setValue('asd');

    toggleInputErrorTextSpy.mockClear();

    numberInput1.trigger('input');
    numberInput2.trigger('input');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(2);
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
      CommonDivisorsActionTypes.SetCommonDivisorSort,
      SortOptions.Asc,
    );

    dispatchSpy.mockClear();
  });

  it('should reset input when input validation resulted false', () => {
    sortInput.setValue('asd');

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    sortInput.trigger('input');

    expect(dispatchSpy).toHaveBeenCalledWith(
      CommonDivisorsActionTypes.SetCommonDivisorSort,
      SortOptions.NotDefined,
    );

    dispatchSpy.mockClear();
  });
});

describe('submit event', () => {
  it('should display number input errors when input validations resulted false', () => {
    numberInput1.setValue('asd');

    toggleInputErrorTextSpy.mockClear();

    form.trigger('submit');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(1);

    numberInput1.setValue('123');
    numberInput2.setValue('asd');

    toggleInputErrorTextSpy.mockClear();

    form.trigger('submit');

    expect(toggleInputErrorTextSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch recent item when successful submit event happens', () => {
    numberInput1.setValue('63');
    numberInput2.setValue('21');

    dispatchSpy.mockClear();

    form.trigger('submit');

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
