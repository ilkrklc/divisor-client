<template>
  <form class="form" :id="id" @submit.prevent="onSubmit">
    <slot />
    <span class="form-error" :id="`${id}-error`">
      {{ ValidationErrors.CommonFormError }}
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ValidationErrors } from '@/typings/enums';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return { ValidationErrors };
  },
});
</script>

<style lang="scss">
@use '@/styles/variables.scss';

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  flex-grow: 1;
  padding: 1rem 5rem;

  input[type='text'] {
    height: 2.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.6);
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
    position: relative;
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

    &.error {
      input[type='text'] {
        border: 1px solid rgba($color: variables.$color-danger, $alpha: 0.6);
        border-color: variables.$color-danger;
      }

      span {
        color: variables.$color-danger;
      }

      small {
        display: block;
        font-size: 0.75rem;
        font-weight: 300;
        align-self: flex-start;
        color: variables.$color-danger;
        margin-top: 0.25rem;
      }
    }

    span {
      font-size: 0.9rem;
      font-weight: 300;
      align-self: flex-start;

      &.error {
        color: variables.$color-danger;
      }
    }

    small {
      position: absolute;
      height: 0.5rem;
      bottom: -0.75rem;
      left: 0;
      display: none;
    }
  }

  .form-error {
    position: absolute;
    display: none;
    bottom: -2rem;
    height: 1rem;
    left: 0;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    color: variables.$color-danger;

    &.display {
      display: block;
    }
  }
}
</style>
