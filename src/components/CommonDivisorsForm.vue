<template>
  <form-wrapper id="common-divisors-form" :onSubmit="handleSubmit">
    <label class="form-label" for="number1">
      <span>Type a natural number</span>
      <input
        type="text"
        name="number1"
        id="number1"
        autocomplete="off"
        v-model="state.number1"
        @input="setNumber1($event.target)"
        placeholder="Ex: 63"
      />
      <small>{{
        state.number1 === undefined
          ? ValidationErrors.NumberEmpty
          : ValidationErrors.NumberNotValid
      }}</small>
    </label>
    <label class="form-label" for="number2">
      <span>Type another natural number</span>
      <input
        type="text"
        name="number2"
        id="number2"
        autocomplete="off"
        v-model="state.number2"
        @input="setNumber2($event.target)"
        placeholder="Ex: 21"
      />
      <small>{{
        state.number2 === undefined
          ? ValidationErrors.NumberEmpty
          : ValidationErrors.NumberNotValid
      }}</small>
    </label>
    <label class="form-label" for="sort">
      <span>You can sort output ordering</span>
      <select
        v-model="state.sort"
        name="sort"
        id="sort"
        @change="setSort($event.target.value)"
      >
        <option
          :key="sortOption.value"
          v-for="sortOption in sortOptions"
          :value="sortOption.value"
        >
          {{ sortOption.text }}
        </option>
      </select>
    </label>
    <button type="submit">
      Calculate
    </button>
  </form-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import { useStore } from '@/hooks/useStore';
import { useSortOptions } from '@/hooks/useSortOptions';
import { CommonDivisorsActionTypes } from '@/store/modules/common-divisors/common-divisors.actions';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';
import { SortOptions, ValidationErrors } from '@/typings/enums';
import {
  validateSortList,
  validateNumberInput,
  toggleInputErrorText,
  toggleFormErrorText,
} from '@/helpers/validation.helpers';
import CommonDivisorResult from '@/models/common-divisor-result.model';
import RecentItem from '@/models/recent-item.model';

import FormWrapper from '@/components/FormWrapper.vue';

export default defineComponent({
  components: { FormWrapper },
  setup() {
    /**
     * Vuex store instance
     */
    const store = useStore();

    /**
     * Form state
     */
    const state = computed(() => store.getters.commonDivisorFormState);

    /**
     * Holds a value to indicate if first number input is touched until page load
     */
    const isNumber1InputDirty = ref<boolean>(state.value.number1 !== undefined);

    /**
     * Holds a value to indicate if second number input is touched until page load
     */
    const isNumber2InputDirty = ref<boolean>(state.value.number2 !== undefined);

    /**
     * Sort options as selectlist
     */
    const sortOptions = useSortOptions();

    /**
     * Handles first number input type event
     * @param {HTMLInputElement} element Input element
     */
    function setNumber1(element: HTMLInputElement): void {
      // flag number input as dirty
      if (isNumber1InputDirty.value === false) isNumber1InputDirty.value = true;

      // destructure value
      const { name, value } = element;

      // validate number
      const [result, number] = validateNumberInput(value);

      // if validation fails find label element and flag with error class
      toggleInputErrorText(result, name);

      // update state
      store.dispatch(CommonDivisorsActionTypes.SetCommonDivisorNumber1, number);
    }

    /**
     * Handles second number input type event
     * @param {HTMLInputElement} element Input element
     */
    function setNumber2(element: HTMLInputElement): void {
      // flag number input as dirty
      if (isNumber2InputDirty.value === false) isNumber2InputDirty.value = true;

      // destructure value
      const { name, value } = element;

      // validate number
      const [result, number] = validateNumberInput(value);

      // if validation fails find label element and flag with error class
      toggleInputErrorText(result, name);

      // update state
      store.dispatch(CommonDivisorsActionTypes.SetCommonDivisorNumber2, number);
    }

    /**
     * Handles sort select input change event
     * @param {SortOptions} value Selected sort option
     */
    function setSort(value: SortOptions): void {
      // initialize sort as local variable
      let sort = value;

      // validate sort expression
      const validationResult = validateSortList(value);

      // reset expression if not validated
      if (validationResult === false) sort = SortOptions.NotDefined;

      // update state
      store.dispatch(CommonDivisorsActionTypes.SetCommonDivisorSort, sort);
    }

    /**
     * Handles form submit event
     */
    function handleSubmit(): void {
      try {
        // if first input is not touched display number error
        if (
          isNumber1InputDirty.value === false ||
          isNumber2InputDirty.value === false
        ) {
          if (isNumber1InputDirty.value === false)
            toggleInputErrorText(false, 'number1');
          if (isNumber2InputDirty.value === false)
            toggleInputErrorText(false, 'number2');

          return;
        }

        // destructure form state
        const { number1, number2, sort } = state.value;
        // if first number not found display number error
        if (!number1) {
          toggleInputErrorText(false, 'number1');

          return;
        }
        // if first number not found display number error
        if (!number2) {
          toggleInputErrorText(false, 'number2');

          return;
        }

        // try to get divisors by initializing divisor result class using divisor package
        const result = new CommonDivisorResult({
          number1,
          number2,
          sort,
        });

        // add new result to recent state
        store.dispatch(
          RecentActionTypes.AddItem,
          new RecentItem({ number1, number2, sort }).fromCalculationResult(
            result,
          ),
        );

        // reset form
        store.dispatch(
          CommonDivisorsActionTypes.SetCommonDivisorNumber1,
          undefined,
        );
        store.dispatch(
          CommonDivisorsActionTypes.SetCommonDivisorNumber2,
          undefined,
        );
        store.dispatch(
          CommonDivisorsActionTypes.SetCommonDivisorSort,
          SortOptions.NotDefined,
        );
        isNumber1InputDirty.value = false;
        isNumber2InputDirty.value = false;
      } catch (error) {
        // display common error text if unexpected error encountered
        toggleFormErrorText(false, 'common-divisors-form');
      }
    }

    return {
      state,
      sortOptions,
      setNumber1,
      setNumber2,
      setSort,
      handleSubmit,
      ValidationErrors,
    };
  },
});
</script>
