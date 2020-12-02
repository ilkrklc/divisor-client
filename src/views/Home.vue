<template>
  <div class="home">
    <greeting />
    <calculator />
    <recent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Greeting from '@/components/Greeting.vue';
import Calculator from '@/components/Calculator.vue';
import Recent from '@/components/Recent.vue';

export default defineComponent({
  components: { Greeting, Calculator, Recent },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_mixins.scss' as *;

.home {
  @include flex(column, flex-start, stretch);

  flex-grow: 1;
}
</style>
