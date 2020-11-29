<template>
  <form-wrapper :onSubmit="handleSubmit">
    <div class="form-horizontal">
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
    </div>
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
import { getDivisors } from 'divisor';

import { useStore } from '@/hooks/useStore';

import FormWrapper from '@/components/FormWrapper.vue';
import { DivisorsActionTypes } from '@/store/modules/divisors/divisors.actions';

export default defineComponent({
  components: { FormWrapper },
  setup() {
    const store = useStore();

    const state = computed(() => store.getters.divisorFormState);

    const sortOptions = [
      {
        value: 'not_defined',
        text: 'Please select...',
      },
      {
        value: 'asc',
        text: 'Ascending',
      },
      {
        value: 'desc',
        text: 'Descending',
      },
    ];

    const parseNumber = (n: string): number | null => {
      const number = parseInt(n, 10);
      if (isNaN(number)) return null;

      return number;
    };

    function setNumber(value: string): void {
      // get only numbers from input string
      const number = value.replace(/\D/g, '');

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
      const {
        number: n,
        sort: s,
        onlyProperDivisors: onlyProper,
      } = state.value;

      // try to parse number
      const number = parseNumber(n);
      if (!number) {
        // TODO - Display error

        console.log('wrong number format.');

        return;
      }

      const divisors = getDivisors(number, {
        sort: s === 'not_defined' ? undefined : s,
        onlyProperDivisors: onlyProper,
      });

      console.log({ divisors });
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

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
}

.form-label {
}
</style>
