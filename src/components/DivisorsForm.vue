<template>
  <form-wrapper :onSubmit="handleSubmit">
    <div class="form-horizontal">
      <label class="form-label">
        <span>Type a natural number</span>
        <input
          type="text"
          v-model="state.number"
          @input="setNumber"
          placeholder="Ex: 63"
        />
      </label>
      <label class="form-label">
        <span>You can sort output ordering</span>
        <select v-model="state.options.sort">
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
      <input type="checkbox" v-model="state.options.onlyProperDivisors" />
      <span>Calculate only<strong> proper </strong>divisors?</span>
    </label>
    <button type="submit">
      Calculate
    </button>
  </form-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import FormWrapper from '@/components/FormWrapper.vue';

interface DivisorOptions {
  sort: 'not_defined' | 'asc' | 'desc';
  onlyProperDivisors: boolean;
}

interface DivisorsFormState {
  number: string;
  options: DivisorOptions;
}

export default defineComponent({
  components: { FormWrapper },
  setup() {
    const state = reactive<DivisorsFormState>({
      number: '',
      options: {
        sort: 'not_defined',
        onlyProperDivisors: false,
      },
    });

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

    const validateNumberValue = (n: string): boolean => {
      const number = parseInt(n, 10);
      if (isNaN(number)) return false;

      return true;
    };

    function setNumber(e: any): void {
      const { value } = e.target;

      // get only numbers from input string
      const number = value.replace(/\D/g, '');

      // set state
      state.number = number;
    }

    function setSort(value: 'asc' | 'desc'): void {
      state.options.sort = value;
    }

    function setProperIndicator(indicator: boolean): void {
      state.options.onlyProperDivisors = indicator;
    }

    function handleSubmit(): void {
      if (validateNumberValue(state.number) === false) {
        // TODO - Display error to user
        return;
      }

      console.log(state);
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
