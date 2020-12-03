<template>
  <footer>
    <span>Copyright &copy; {{ getYear }} İlker Kılıç</span>
    <span>Released under the<strong> MIT License</strong></span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'footer-bar',
  computed: {
    getYear(): number {
      const d = new Date();

      return d.getUTCFullYear();
    },
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

  span {
    @include font-style(0.75rem, 500, 0.9);
  }
}
</style>
