<template>
  <form class="form" :id="id" @submit.prevent="() => onSubmit()">
    <slot />
    <span class="form-error" :id="`${id}-error`">
      {{ ValidationErrors.CommonFormError }}
    </span>
  </form>
</template>

<script lang="ts">
import { ValidationErrors } from '@/typings/enums';
import { defineComponent } from 'vue';

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
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

.form {
  @include flex(column, space-evenly, stretch);
  @include padding-x(5rem);
  @include padding-y(1rem);

  position: relative;
  flex-grow: 1;

  input[type='text'] {
    @include padding-x(0.75rem);
    @include padding-y(0.5rem);
    @include font-style(1.1rem, 400, 1, $color-text);
    @include shadow-centered(2px, 0.25);

    font-family: $font-raj;
    height: 2.5rem;
    border: 1px solid $color-border;
  }
  input[type='text']:focus,
  select:focus {
    outline-color: $color-green;
  }
  select {
    @include padding-x(0.75rem);
    @include padding-y(0.25rem);
    @include font-style(1.1rem, 400, 1, $color-text);
    @include shadow-centered(2px, 0.25);

    font-family: $font-raj;
    flex-grow: 1;
    height: 2.5rem;
    border: 1px solid $color-border;
  }

  button[type='submit'] {
    @include font-style(1.2rem, 600, 1, $color-text);
    @include padding-x(4rem);
    @include padding-y(0.75rem);
    @include margin-x(auto);

    width: 70%;
    background-color: $color-green;
    border: 2px solid $color-green;
    color: $color-white;
    transition: all ease-in-out 0.2s;
    border-radius: 7px;
  }
  button[type='submit']:hover {
    background-color: transparent;
    border: 2px solid $color-green;
    color: $color-green;
  }

  .form-label {
    @include flex(column, flex-start, stretch);

    position: relative;

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
        border: 1px solid rgba($color: $color-danger, $alpha: 0.6);
        border-color: $color-danger;
      }

      span {
        color: $color-danger;
      }

      small {
        @include font-style(0.8rem, 400, 1, $color-danger);

        display: block;
        align-self: flex-start;
        margin-top: 0.25rem;
      }
    }

    span {
      @include font-style(0.875rem, 500, 1);

      align-self: flex-start;

      &.error {
        color: $color-danger;
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
    @include font-style(1rem, 400, 1, $color-danger);

    position: absolute;
    display: none;
    bottom: -2rem;
    height: 1rem;
    left: 0;
    width: 100%;

    &.display {
      display: block;
    }
  }
}

@media (max-width: $breakpoint-desktop) {
  .form {
    @include padding-x(2.5rem);
  }
}

@media (max-width: $breakpoint-mobile) {
  .form {
    @include padding-x(1rem);
  }
}
</style>
