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
        v-for="calculation in pagedRecentItems"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
} from 'vue';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useStore } from '@/hooks/useStore';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';

import RecentItem from '@/components/RecentItem.vue';
import RecentItemModel from '@/models/recent-item.model';

export default defineComponent({
  components: {
    RecentItem,
  },
  setup() {
    const INFINITE_SCROLL_OFFSET = 300;
    const INFINITE_SCROLL_PAGE_SIZE = 5;

    const infiniteScrollPageIndex = ref<number>(0);
    const allItemsLoaded = ref<boolean>(false);

    const store = useStore();

    const { scrollPosition } = useScrollPosition();

    const recentCalculations = computed(() => store.getters.recentCalculations);
    const isRecentLoading = computed(() => store.getters.isRecentLoading);
    const totalRecentItemCount = computed(() => store.getters.totalRecentCount);
    const hasRecentCalculations = computed(
      () => store.getters.hasRecentCalculations,
    );

    const pagedRecentItems = computed<RecentItemModel[]>(() => {
      if (recentCalculations.value.length <= 5) return recentCalculations.value;

      const toBeLoadedItemsCount =
        infiniteScrollPageIndex.value * INFINITE_SCROLL_PAGE_SIZE +
        INFINITE_SCROLL_PAGE_SIZE;

      const pagedItems = recentCalculations.value.slice(
        0,
        infiniteScrollPageIndex.value * INFINITE_SCROLL_PAGE_SIZE +
          INFINITE_SCROLL_PAGE_SIZE,
      );

      if (toBeLoadedItemsCount > recentCalculations.value.length)
        allItemsLoaded.value = true;

      return pagedItems;
    });

    function checkScrollOffset() {
      if (allItemsLoaded.value) return;

      if (scrollPosition.value > INFINITE_SCROLL_OFFSET) return;

      infiniteScrollPageIndex.value++;
    }

    onBeforeMount(() => store.dispatch(RecentActionTypes.GetItems));

    onMounted(() => {
      window.addEventListener('scroll', checkScrollOffset);
    });

    onUnmounted(() => {
      window.addEventListener('scroll', checkScrollOffset);
    });

    return {
      recentCalculations,
      hasRecentCalculations,
      isRecentLoading,
      totalRecentItemCount,
      pagedRecentItems,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

.recent {
  @include flex(column, flex-start, stretch);
  @include margin-x(auto);

  flex-grow: 1;
  width: 90%;

  .results {
    @include flex(column, flex-start, stretch);
    @include margin-y(0);
    @include margin-x(auto);

    flex-grow: 1;
    max-width: 750px;
    width: 750px;
  }
}

.recent-header {
  @include font-style(1.25rem, 700);

  margin-bottom: 2.5rem;

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

@media (max-width: $breakpoint-desktop) {
  .recent {
    .results {
      @include padding-x(1rem);

      max-width: 100%;
      width: 100%;
    }
  }

  .recent-header {
    &::before {
      content: '';
      display: inline-block;
      width: 12.5rem;
      height: 100%;
      margin-bottom: 5px;
      margin-right: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }

    &::after {
      content: '';
      display: inline-block;
      width: 12.5rem;
      height: 100%;
      margin-bottom: 5px;
      margin-left: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .recent-header {
    @include font-style(1.1rem, 600);

    margin-bottom: 2.5rem;

    &::before {
      content: '';
      display: inline-block;
      width: 6.5rem;
      height: 100%;
      margin-bottom: 5px;
      margin-right: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }

    &::after {
      content: '';
      display: inline-block;
      width: 6.5rem;
      height: 100%;
      margin-bottom: 5px;
      margin-left: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .recent-header {
    @include font-style(1rem, 600);

    &::before {
      content: '';
      display: inline-block;
      width: 4rem;
      height: 100%;
      margin-bottom: 5px;
      margin-right: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }

    &::after {
      content: '';
      display: inline-block;
      width: 4rem;
      height: 100%;
      margin-bottom: 5px;
      margin-left: 1.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.225);
    }
  }
}
</style>
