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
footer {
  height: 3rem;
  max-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 4rem;
  margin-right: 4rem;

  span {
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.9;
  }
}
</style>
