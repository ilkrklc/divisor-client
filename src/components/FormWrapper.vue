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
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
  padding: 1rem 5rem;

  input[type='text'] {
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
        margin-right: 0.25rem;
      }
    }

    &:not(.checkbox-label) span {
      margin-bottom: 0.5rem;
    }
  }

  .form-horizontal {
    display: flex;
    align-items: stretch;
    margin-bottom: 1rem;

    .form-label {
      flex-grow: 1;
      margin-bottom: 0;

      span {
        align-self: flex-start;
      }
    }

    .form-label:first-child {
      padding-right: 0.5rem;
      margin-right: 0.5rem;
      border-right: 0.5px dashed
        rgba($color: variables.$color-dark, $alpha: 0.25);
    }
  }
}
</style>
