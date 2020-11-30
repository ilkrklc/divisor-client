<template>
  <div id="greeting">
    <div>Welcome to <strong> divisor</strong>.</div>
    <div>
      Here you can calculate <em>{{ calculationName }}</em> of natural numbers.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useStore } from '@/hooks/useStore';

export default defineComponent({
  setup() {
    const store = useStore();

    const calculationName = computed(
      () => store.getters.calculationDisplayName,
    );

    return {
      calculationName,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss';

#greeting {
  margin-top: 5rem;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;

  strong {
    color: variables.$color-dark;
  }
}
</style>
