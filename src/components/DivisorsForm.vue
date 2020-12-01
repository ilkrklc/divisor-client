<template>
  <form-wrapper id="divisors-form" :onSubmit="handleSubmit">
    <label class="form-label" for="number">
      <span>Type a natural number</span>
      <input
        type="text"
        name="number"
        id="number"
        autocomplete="off"
        v-model="state.number"
        @input="setNumber($event.target)"
        placeholder="Ex: 63"
      />
      <small>{{
        state.number === undefined
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
    <label class="form-label checkbox-label" for="proper">
      <input
        type="checkbox"
        name="proper"
        id="proper"
        v-model="state.onlyProperDivisors"
        @change="setProperIndicator($event.target.checked)"
      />
      <span>Calculate only<strong> proper </strong>divisors?</span>
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
import { DivisorsActionTypes } from '@/store/modules/divisors/divisors.actions';
import { SortOptions, ValidationErrors } from '@/typings/enums';
import {
  validateSortList,
  validateNumberInput,
  toggleInputErrorText,
  toggleFormErrorText,
} from '@/helpers/validation.helpers';
import DivisorResult from '@/models/divisor-result.model';

import FormWrapper from '@/components/FormWrapper.vue';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';
import RecentItem from '@/models/recent-item.model';

export default defineComponent({
  components: { FormWrapper },
  setup() {
    /**
     * Vuex store instance
     */
    const store = useStore();

    /**
     * Holds a value to indicate if number input is touched until page load
     */
    const isNumberInputDirty = ref<boolean>(false);

    /**
     * Form state
     */
    const state = computed(() => store.getters.divisorFormState);

    /**
     * Sort options as selectlist
     */
    const sortOptions = useSortOptions();

    /**
     * Handles number input type event
     * @param {HTMLInputElement} element Input element
     */
    function setNumber(element: HTMLInputElement): void {
      // flag number input as dirty
      if (isNumberInputDirty.value === false) isNumberInputDirty.value = true;

      // destructure value
      const { name, value } = element;

      // validate number
      const [result, number] = validateNumberInput(value);

      // if validation fails find label element and flag with error class
      toggleInputErrorText(result, name);

      // update state
      store.dispatch(DivisorsActionTypes.SetNumber, number);
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
      store.dispatch(DivisorsActionTypes.SetSort, sort);
    }

    /**
     * Handles only proper divisors checkbox change event
     * @param {boolean} indicator Indicates proper divisor request
     */
    function setProperIndicator(indicator: boolean): void {
      // update state
      store.dispatch(DivisorsActionTypes.SetOnlyProperDivisors, indicator);
    }

    /**
     * Handles form submit event
     */
    function handleSubmit(): void {
      try {
        // if no input is touched display number error
        if (isNumberInputDirty.value === false) {
          toggleInputErrorText(false, 'number');

          return;
        }

        // destructure form state
        const { number, sort: s, onlyProperDivisors: onlyProper } = state.value;
        // if no number found display number error
        if (!number) {
          toggleInputErrorText(false, 'number');

          return;
        }

        // parse sort expression
        const sort = s === SortOptions.NotDefined ? undefined : s;

        // try to get divisors by initializing divisor result class using divisor package
        const result = new DivisorResult({
          number,
          sort,
          onlyProperDivisors: onlyProper,
        });

        // add new result to recent state
        store.dispatch(
          RecentActionTypes.AddItem,
          new RecentItem(number, sort, onlyProper).fromCalculationResult(
            result,
          ),
        );

        // reset form
        store.dispatch(DivisorsActionTypes.SetNumber, undefined);
        store.dispatch(DivisorsActionTypes.SetSort, SortOptions.NotDefined);
        store.dispatch(DivisorsActionTypes.SetOnlyProperDivisors, false);
        isNumberInputDirty.value = false;
      } catch (error) {
        // display common error text if unexpected error encountered
        toggleFormErrorText(false, 'divisors-form');
      }
    }

    return {
      state,
      sortOptions,
      setNumber,
      setSort,
      setProperIndicator,
      handleSubmit,
      ValidationErrors,
    };
  },
});
</script>
