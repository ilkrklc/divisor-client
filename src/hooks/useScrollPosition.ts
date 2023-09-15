import { Ref, onMounted, onUnmounted, ref } from 'vue';

/**
 * Gets current scroll position and offset from scroll event
 */
export function useScrollPosition(): {
  scrollPosition: Ref<number>;
  scrollOffset: Ref<number>;
} {
  /**
   * Scroll position in pixels
   */
  const scrollPosition = ref<number>(0);

  /**
   * Scroll offset from bottom of the page in pixels
   */
  const scrollOffset = ref<number>(0);

  /**
   * Updates exported values - scroll event handler
   */
  function update() {
    // get variables required for scroll calculations
    const viewportHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    );
    const documentHeight = document.body.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    // update references
    scrollPosition.value = scrollTop;
    scrollOffset.value = documentHeight - (scrollTop + viewportHeight);
  }

  onMounted(() => {
    window.addEventListener('scroll', update);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', update);
  });

  return { scrollPosition, scrollOffset };
}
