<template>
  <div class="home">
    <greating />
    <calculator />
    <recent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Greating from '@/components/Greating.vue';
import Calculator from '@/components/Calculator.vue';
import Recent from '@/components/Recent.vue';

export default defineComponent({
  components: { Greating, Calculator, Recent },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
