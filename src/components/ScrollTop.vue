<template>
  <transition name="fade" mode="out-in">
    <button
      v-if="displayScrollTopButton"
      type="button"
      @click="handleScrollTopClick"
      class="scroll-top"
    >
      <img src="@/assets/images/chevron-up.png" alt="scroll top button" />
    </button>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

import { useScrollPosition } from '@/hooks/useScrollPosition';

export default defineComponent({
  setup() {
    /**
     * Offset in pixels to display scroll top button
     */
    const SCROLL_TOP_OFFSET = 400; // in pixels

    /**
     * Current scroll position
     */
    const { scrollPosition } = useScrollPosition();

    /**
     * Indicator for displaying scroll top button
     */
    const displayScrollTopButton = ref<boolean>(false);

    /**
     * Controls display of scroll top button - scroll event handler
     */
    function scrollTop(): void {
      const currentStatus = scrollPosition.value >= SCROLL_TOP_OFFSET;

      if (displayScrollTopButton.value !== currentStatus)
        displayScrollTopButton.value = currentStatus;
    }

    /**
     * Handles scroll top button click - scroll button click event handler
     * @summary Scrolls up document
     */
    function handleScrollTopClick(): void {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    onMounted(() => {
      window.addEventListener('scroll', scrollTop);
    });

    onUnmounted(() => {
      window.addEventListener('scroll', scrollTop);
    });

    return {
      displayScrollTopButton,
      handleScrollTopClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.scroll-top {
  display: block;
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  height: 4.5rem;
  width: 4.5rem;
<<<<<<< HEAD
  z-index: 100;
=======
>>>>>>> main

  img {
    width: 100%;
  }

  &:active {
    height: 4.75rem;
    width: 4.75rem;
    right: 2.875rem;
    bottom: 2.875rem;
  }
}
</style>
