<template>
  <form-wrapper :onSubmit="() => console.log('submit')">
    <div>Common Divisors Form</div>
  </form-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormWrapper from './FormWrapper.vue';

export default defineComponent({
  components: { FormWrapper },
  setup() {
    return {};
  },
});
</script>
