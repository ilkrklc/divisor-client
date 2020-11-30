<template>
  <form-wrapper :onSubmit="handleSubmit">
    <label class="form-label">
      <span>Type a natural number</span>
      <input
        type="text"
        v-model="state.number"
        @input="setNumber($event.target.value)"
        placeholder="Ex: 63"
      />
    </label>
    <label class="form-label">
      <span>You can sort output ordering</span>
      <select v-model="state.sort" @change="setSort($event.target.value)">
        <option
          :key="sortOption.value"
          v-for="sortOption in sortOptions"
          :value="sortOption.value"
        >
          {{ sortOption.text }}
        </option>
      </select>
    </label>
    <label class="form-label checkbox-label">
      <input
        type="checkbox"
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
import { defineComponent, computed } from 'vue';

import { useStore } from '@/hooks/useStore';
import { DivisorsActionTypes } from '@/store/modules/divisors/divisors.actions';

import { useSortOptions } from '@/hooks/useSortOptions';
import { parseNumber } from '@/helpers/number.helpers';
import DivisorResult from '@/models/divisor-result.model';

import FormWrapper from '@/components/FormWrapper.vue';
import { SortOptions } from '@/typings/enums';

export default defineComponent({
  components: { FormWrapper },
  setup() {
    const store = useStore();

    const state = computed(() => store.getters.divisorFormState);

    const sortOptions = useSortOptions();

    function setNumber(value: string): void {
      // get only numbers from input string
      const numberText = value.replace(/\D/g, '');

      // parse input number
      const number = parseNumber(numberText);

      // update state
      store.dispatch(DivisorsActionTypes.SetNumber, number);
    }

    function setSort(value: 'asc' | 'desc'): void {
      store.dispatch(DivisorsActionTypes.SetSort, value);
    }

    function setProperIndicator(indicator: boolean): void {
      store.dispatch(DivisorsActionTypes.SetOnlyProperDivisors, indicator);
    }

    function handleSubmit(): void {
      // destructure form state
      const { number, sort: s, onlyProperDivisors: onlyProper } = state.value;

      // TODO - Display Error
      if (!number) return;

      // try to get divisors
      const result = new DivisorResult({
        number,
        sort: s === SortOptions.NotDefined ? undefined : s,
        onlyProperDivisors: onlyProper,
      });

      console.log({ result });
    }

    return {
      state,
      sortOptions,
      setNumber,
      setSort,
      setProperIndicator,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
