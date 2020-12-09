<template>
  <footer>
    <span>Copyright &copy; {{ year }} İlker Kılıç</span>
    <span>Released under the<strong> MIT License</strong></span>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    /**
     * Gets current year as 4 digit display format
     */
    function getYear(): number {
      // get current date
      const d = new Date();

      // return year as 4 digit display format
      return d.getUTCFullYear();
    }

    /**
     * Current year as 4 digit display format
     */
    const year = ref<number>(getYear());

    return { year };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_mixins.scss' as *;

footer {
  @include flex(row, space-between, center);
  @include margin-x(4rem);

  height: 3rem;
  max-height: 3rem;
  margin-top: 2rem;

  span {
    @include font-style(0.75rem, 500, 0.9);
  }
}
</style>
