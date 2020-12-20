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
    /**
     * Vuex store
     */
    const store = useStore();

    /**
     * Active tab name as calculation type
     */
    const activeTabName = ref<CalculationType>(CalculationType.Divisors);

    /**
     * Sets active tab name - Calculator nav item click event handler
     * @param {CalculationType} tabName Clicked tab name
     */
    function setActiveTabName(tabName: CalculationType): void {
      // if faulty tab name encounterd do nothing
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
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

.calculator-wrapper {
  @include flex(column, flex-start, stretch);
  @include shadow-centered(20px, 0.35);
  @include margin-x(auto);
  @include margin-y(4rem);

  height: 400px;
  min-width: 600px;
  max-width: 600px;
  border-radius: 0.375rem;
  background-color: $color-white;

  .calculator-navigation {
    @include flex(row);

    height: 3.5rem;

    .calculator-tab-item {
      @include font-style(1rem, 600, 0.5, $color-medium);
      width: 50%;
      flex-grow: 1;
      background: transparent;
      border: none;
      transition: color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
      cursor: pointer;

      &.active {
        color: $color-dark;
      }

      &:first-child:not(.active) {
        @include shadow-inset(-6px, 0px, 11px, 0.29);
      }

      &:last-child:not(.active) {
        @include shadow-inset(6px, 0px, 11px, 0.29);
      }
    }
  }

  .calculator-content {
    @include flex(row);

    flex-grow: 1;
  }
}

@media (max-width: $breakpoint-tablet) {
  .calculator-wrapper {
    min-width: 80%;
  }
}

@media (max-width: $breakpoint-mobile) {
  .calculator-wrapper {
    min-width: 95%;
  }
}
</style>
