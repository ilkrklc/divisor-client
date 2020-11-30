<template>
  <div class="calculator-wrapper">
    <div class="calculator-navigation">
      <button
        type="button"
        @click="setActiveTabName(CalculationType.Divisors)"
        :class="[
          'calculator-tab-item',
          activeTabName === 'divisors' ? 'active' : '',
        ]"
      >
        Divisors
      </button>
      <button
        type="button"
        @click="setActiveTabName(CalculationType.CommonDivisors)"
        :class="[
          'calculator-tab-item',
          activeTabName === 'common_divisors' ? 'active' : '',
        ]"
      >
        Common Divisors
      </button>
    </div>
    <div class="calculator-content">
      <divisors-form v-if="activeTabName === CalculationType.Divisors" />
      <common-divisors-form v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { CalculationType } from '@/typings/enums';

import { useStore } from '@/hooks/useStore';
import { GreetingActionTypes } from '@/store/modules/greeting/greeting.actions';

import DivisorsForm from './DivisorsForm.vue';
import CommonDivisorsForm from './CommonDivisorsForm.vue';

export default defineComponent({
  components: { DivisorsForm, CommonDivisorsForm },
  setup() {
    const store = useStore();

    const activeTabName = ref<CalculationType>(CalculationType.Divisors);

    function setActiveTabName(tabName: CalculationType): void {
      if (!tabName || tabName === activeTabName.value) return;

      // update local state
      activeTabName.value = tabName;

      // update greeting vuex state
      store.dispatch(GreetingActionTypes.SetCalculationTypeName, tabName);
    }

    return {
      activeTabName,
      setActiveTabName,
      CalculationType,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss';

.calculator-wrapper {
  height: 400px;
  width: 50%;
  min-width: 350px;
  max-width: 600px;
  border-radius: 0.375rem;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 4rem;
  margin-bottom: 4rem;
  background-color: #fdfffc;

  .calculator-navigation {
    display: flex;
    height: 3.5rem;

    .calculator-tab-item {
      flex-grow: 1;
      font-weight: 500;
      background: transparent;
      border: none;
      opacity: 0.5;
      transition: opacity 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
      color: variables.$color-medium;
      outline: 2px solid transparent;
      outline-offset: 2px;
      cursor: pointer;

      &.active {
        opacity: 1;
        color: variables.$color-dark;
      }

      &:first-child:not(.active) {
        -webkit-box-shadow: inset -6px 0px 11px 0px rgba(0, 0, 0, 0.29);
        box-shadow: inset -6px 0px 11px 0px rgba(0, 0, 0, 0.29);
      }

      &:last-child:not(.active) {
        -webkit-box-shadow: inset 6px 0px 11px 0px rgba(0, 0, 0, 0.29);
        box-shadow: inset 6px 0px 11px 0px rgba(0, 0, 0, 0.29);
      }
    }
  }

  .calculator-content {
    display: flex;
    flex-grow: 1;
  }
}
</style>
