<template>
  <div class="recent">
    <div class="recent-header">Recent Calculations</div>
    <div v-if="hasRecentCalculations === false" class="no-results">
      Your recent calculation results will be listed here.
    </div>
    <ul v-else class="results">
      <recent-item
        :key="calculation.id"
        :item="calculation"
        v-for="calculation in recentCalculations"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';

import { useStore } from '@/hooks/useStore';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';
import RecentItem from './RecentItem.vue';

export default defineComponent({
  components: {
    RecentItem,
  },
  setup() {
    const store = useStore();

    const recentCalculations = computed(() => store.getters.recentCalculations);
    const isRecentLoading = computed(() => store.getters.isRecentLoading);
    const totalRecentItemCount = computed(() => store.getters.totalRecentCount);
    const hasRecentCalculations = computed(
      () => store.getters.hasRecentCalculations,
    );

    onBeforeMount(() => store.dispatch(RecentActionTypes.GetItems));

    return {
      recentCalculations,
      hasRecentCalculations,
      isRecentLoading,
      totalRecentItemCount,
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
    margin-bottom: 2.5rem;
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

  .results {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex-grow: 1;
    max-width: 750px;
    width: 750px;
    margin: 0 auto;
  }
}
</style>
