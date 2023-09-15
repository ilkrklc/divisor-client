<template>
  <div id="greeting">
    <div>Welcome to divisor.</div>
    <div>
      Here you can calculate <b>{{ calculationName }}</b> of natural numbers.
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/hooks/useStore';
import { computed, defineComponent } from 'vue';

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
  @include font-style(1.4rem, 400, 0.9);

  margin-top: 6rem;

  div:first-child {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }
}
</style>
