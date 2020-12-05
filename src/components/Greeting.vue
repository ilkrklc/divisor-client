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
    /**
     * Vuex store
     */
    const store = useStore();

    /**
     * Calculation display name
     */
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
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

#greeting {
  @include font-style(1.2rem, 400, 0.9);

  margin-top: 5rem;

  strong {
    color: $color-dark;
  }
}
</style>
