<template>
  <div id="navbar">
    <router-link id="navbar-name" to="/">divisor</router-link>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div
      id="navbar-github"
      :class="{ hovered: isGitLogoHovered }"
      @mouseenter="handleGitLogoHover(true)"
      @mouseleave="handleGitLogoHover(false)"
    >
      <a
        href="https://github.com/ilkrklc/divisor"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src="../assets/images/git-logo-white.png"
          alt="github project link"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    /**
     * Indicator for git logo hover status
     */
    const isGitLogoHovered = ref<boolean>(false);

    /**
     * Switches git logo hover status - git section hover event handler
     * @param {boolean} isHovered Hover indicator
     */
    function handleGitLogoHover(isHovered: boolean): void {
      isGitLogoHovered.value = isHovered;
    }

    return {
      isGitLogoHovered,
      handleGitLogoHover,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

#navbar {
  @include flex(row, space-between);
  font-family: $font-raj;

  height: 5rem;
  max-height: 5rem;
  border-bottom: 1px solid #eaeaea;

  &-name {
    @include flex(row, center, center);
    @include font-style(2.5rem, 700, 1, $color-green);

    width: 10rem;
    margin-right: 2rem;
    text-decoration: none;
  }

  .navbar-links {
    @include flex(row, flex-start, center);

    flex-grow: 1;

    a {
      @include flex(row, center, center);
      @include font-style(1.3, 500, 1, $color-text);

      text-decoration: none;
      border-bottom-width: 3px;
      border-bottom-style: solid;
      border-bottom-color: transparent;
      width: 6rem;
      height: 2.75rem;
      transition:
        color 0.1s ease-in,
        border-bottom-color 0.2s ease-in,
        font-size 0.05ms ease-in;

      &:not(:first-child) {
        margin-left: 2rem;
      }

      &.router-link-exact-active {
        font-size: 1.15rem;
        color: $color-text;
        font-weight: 700;
        border-bottom-color: $color-green;
      }
    }
  }

  #navbar-github {
    @include flex(row, flex-end, center);

    a {
      @include flex(row, center, center);

      height: 100%;
      width: 5rem;
      background-color: $color-green;
      z-index: 2;

      img {
        width: 38px;
        height: 38px;
        z-index: 20;
        background-color: $color-green;
        transition: opacity 0.1s ease-in-out;
      }
    }
  }
}

@media (min-width: $breakpoint-tablet) and (max-width: $breakpoint-desktop) {
  #navbar {
    &-name {
      width: 12.5rem;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  #navbar {
    &-name {
      width: 12.5rem;
      margin-right: 1.5rem;
      font-size: 1.5rem;
    }

    .navbar-links {
      a {
        @include font-style(1rem, 400, 0.75, $color-text);

        &:not(:first-child) {
          margin-left: 0.75rem;
        }

        &.router-link-exact-active {
          font-size: 1.1rem;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  #navbar {
    &-name {
      margin-right: 1rem;
    }
  }
}
</style>
