<template>
  <div class="calculator-wrapper">
    <div class="calculator-navigation">
      <button
        type="button"
        @click="setActiveTabName('divisors')"
        :class="[
          'calculator-tab-item',
          activeTabName === 'divisors' ? 'active' : '',
        ]"
      >
        Divisors
      </button>
      <button
        type="button"
        @click="setActiveTabName('common_divisors')"
        :class="[
          'calculator-tab-item',
          activeTabName === 'common_divisors' ? 'active' : '',
        ]"
      >
        Common Divisors
      </button>
    </div>
    <div class="calculator-content">
      <divisors-form v-if="activeTabName === 'divisors'" />
      <div v-else>Common Divisors Form</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import DivisorsForm from './DivisorsForm.vue';

export default defineComponent({
  components: { DivisorsForm },
  setup() {
    const activeTabName = ref<string>('divisors');

    function setActiveTabName(tabName: string): void {
      if (!tabName || tabName === activeTabName.value) return;

      activeTabName.value = tabName;
    }

    return {
      activeTabName,
      setActiveTabName,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss';

.calculator-wrapper {
  height: 500px;
  width: 50%;
  min-width: 350px;
  border-radius: 0.375rem;
  -webkit-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 4rem;
  margin-bottom: 4rem;

  .calculator-navigation {
    display: flex;
    height: 3.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

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
}
</style>
