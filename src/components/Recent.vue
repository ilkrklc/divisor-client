<template>
  <div class="recent">
    <div class="recent-header">Recent Calculations</div>
    <div v-if="hasRecentCalculations" class="no-results">
      Your recent calculation results will be listed here.
    </div>
    <ul v-else class="results">
      <li :key="calculation.id" v-for="calculation in recentCalculations">
        Calculation Item
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const recentCalculations = ref<unknown[]>([]);

    function hasRecentCalculations(): boolean {
      return recentCalculations.value.length > 0;
    }

    return {
      recentCalculations,
      hasRecentCalculations,
    };
  },
});
</script>

<style lang="scss" scoped>
.recent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
  width: 100%;

  .recent-header {
    margin-bottom: 3rem;
    font-size: 1.25rem;
    font-weight: 700;

    &::before {
      content: '';
      display: inline-block;
      width: 15rem;
      height: 100%;
      margin-bottom: 5px;
      margin-right: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }

    &::after {
      content: '';
      display: inline-block;
      width: 15rem;
      height: 100%;
      margin-bottom: 5px;
      margin-left: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }
  }
}
</style>
