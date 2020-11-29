<template>
  <form class="form" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@use '@/styles/variables.scss';

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  flex-grow: 1;
  padding: 1rem 5rem;

  input[type='text'] {
    height: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  button[type='submit'] {
    background: transparent;
    border: 1px solid variables.$color-dark;
    color: variables.$color-dark;
    padding: 0.75rem 4rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  select {
    flex-grow: 1;
    height: 2.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  select,
  button,
  .checkbox-label {
    cursor: pointer;
  }

  .form-label {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &.checkbox-label {
      flex-direction: row;
      align-items: center;

      input {
        height: 1rem;
        width: 1rem;
        margin-right: 0.5rem;
      }
    }

    &:not(.checkbox-label) span {
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 300;
      align-self: flex-start;
    }
  }
}
</style>
