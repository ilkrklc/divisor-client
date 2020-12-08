<template>
  <div class="recent">
    <div class="recent-header">Recent Calculations</div>
    <div v-if="hasRecentCalculations === false" class="no-results">
      <span>Your recent calculation results will be listed here.</span>
    </div>
    <div v-else class="recent-content">
      <div class="recent-actions">
        <button
          type="button"
          class="recent-action danger"
          @click="handleClearItems"
        >
          Clear All
        </button>
      </div>
      <transition-group name="recent-list" tag="ul" class="results">
        <recent-item
          :key="calculation.id"
          :item="calculation"
          v-for="calculation in pagedRecentItems"
        />
      </transition-group>
    </div>
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
import RecentItemModel from '@/models/recent-item.model';
import {
  INFINITE_SCROLL_OFFSET,
  INFINITE_SCROLL_PAGE_SIZE,
} from '@/helpers/constants';

import RecentItem from '@/components/RecentItem.vue';

export default defineComponent({
  components: {
    RecentItem,
  },
  setup() {
    /**
     * Current infinite scroll trigger count. Used to calculate displayed item count
     */
    const infiniteScrollPageIndex = ref<number>(0);

    /**
     * Indicator for no more items left to load
     */
    const allItemsLoaded = ref<boolean>(false);

    /**
     * Vuex store
     */
    const store = useStore();

    /**
     * Current scroll offset
     */
    const { scrollOffset } = useScrollPosition();

    /**
     * Recent calculation items to display
     */
    const items = computed(() => store.getters.recentCalculations);

    /**
     * Indicator for any recent calculation exists
     */
    const hasRecentCalculations = computed(
      () => store.getters.hasRecentCalculations,
    );

    /**
     * Paged calculation items for infinite scroll effect
     */
    const pagedRecentItems = computed<RecentItemModel[]>(() => {
      // if items length does not need pagination do nothing
      if (items.value.length <= INFINITE_SCROLL_PAGE_SIZE) return items.value;

      // calculate total displayed item count
      const toBeLoadedItemsCount =
        infiniteScrollPageIndex.value * INFINITE_SCROLL_PAGE_SIZE +
        INFINITE_SCROLL_PAGE_SIZE;

      // get paged items
      const pagedItems = items.value.slice(
        0,
        infiniteScrollPageIndex.value * INFINITE_SCROLL_PAGE_SIZE +
          INFINITE_SCROLL_PAGE_SIZE,
      );

      // check for any items left mark loaded indicator if not
      if (toBeLoadedItemsCount > items.value.length)
        allItemsLoaded.value = true;

      return pagedItems;
    });

    /**
     * Check scroll offset and increments scroll index - scroll event handler
     */
    function checkScrollOffset() {
      if (allItemsLoaded.value) return;

      if (scrollOffset.value > INFINITE_SCROLL_OFFSET) return;

      infiniteScrollPageIndex.value++;
    }

    /**
     * Handles clear items action - recent actions clear items button click event
     */
    function handleClearItems() {
      store.dispatch(RecentActionTypes.ClearItems);
    }

    onBeforeMount(() => store.dispatch(RecentActionTypes.GetItems));

    onMounted(() => {
      window.addEventListener('scroll', checkScrollOffset);
    });

    onUnmounted(() => {
      window.addEventListener('scroll', checkScrollOffset);
    });

    return {
      items,
      hasRecentCalculations,
      pagedRecentItems,
      handleClearItems,
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

  &-content {
    @include flex(column, flex-start, stretch);
  }

  &-actions {
    @include flex(row, flex-end, center);
    @include margin-y(1rem);
    @include margin-x(auto);

    max-width: 750px;
    width: 750px;

    .recent-action {
      @include padding-y(0.4rem);
      @include padding-x(0.75rem);
      @include font-style(0.8rem, 700);

      border-radius: 10px;

      &.danger {
        color: $color-white;
        background-color: rgba($color: $color-danger, $alpha: 0.875);

        &:hover {
          background-color: rgba($color: $color-danger, $alpha: 0.95);
        }

        &:active {
          background-color: $color-danger;
        }
      }
    }
  }

  .no-results {
    @include flex(row, center, center);

    flex-grow: 1;
  }

  .results {
    @include flex(column, flex-start, stretch);
    @include margin-y(0);
    @include margin-x(auto);

    flex-grow: 1;
    max-width: 750px;
    width: 750px;

    .recent-list-enter-active {
      transition: all 0.9s ease;
    }

    .recent-list-leave-active {
      transition: all 0.5s ease;
    }

    .recent-list-enter-from {
      opacity: 0;
      transform: translateY(-100px);
    }

    .recent-list-leave-to {
      opacity: 0;
      transform: translateX(-300px);
    }

    .recent-list-move {
      transition: transform 0.8s ease;
    }
  }
}

.recent-header {
  @include font-style(1.25rem, 700);

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
