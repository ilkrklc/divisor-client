import { ref, onMounted, onUnmounted, Ref } from 'vue';

export function useScrollPosition(): {
  scrollPosition: Ref<number>;
  scrollOffset: Ref<number>;
} {
  const scrollPosition = ref<number>(0);
  const scrollOffset = ref<number>(0);

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
