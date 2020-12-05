<template>
  <div id="navbar">
    <router-link id="navbar-name" to="/">Divisor</router-link>
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
        <img src="../assets/images/git-logo.png" alt="github project link" />
      </a>
      <span class="navbar-github-description">
        Visit project repository...
      </span>
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
  font-family: $font-lato;

  height: 5rem;
  max-height: 5rem;

  #navbar-name {
    @include flex(row, center, center);
    @include font-style(1.6rem, 700, 1, $color-medium);

    width: 15rem;
    margin-right: 2rem;
    text-decoration: none;
  }

  .navbar-links {
    @include flex(row, flex-start, center);

    flex-grow: 1;

    a {
      @include flex(row, center, center);
      @include font-style(1.075rem, 400, 0.75, $color-text);

      text-decoration: none;
      border-bottom-width: 0.75px;
      border-bottom-style: solid;
      border-bottom-color: transparent;
      width: 6rem;
      height: 2.75rem;
      transition: color 0.1s ease-in, border-bottom-color 0.2s ease-in,
        font-size 0.05ms ease-in;

      &:not(:first-child) {
        margin-left: 2rem;
      }

      &.router-link-exact-active {
        font-size: 1.15rem;
        color: $color-medium;
        border-bottom-color: rgba($color: $color-medium, $alpha: 0.5);
      }
    }
  }

  #navbar-github {
    @include flex(row, flex-end, center);

    position: relative;
    width: 15rem;
    margin-right: 1.5rem;
    overflow: hidden;

    &.hovered {
      .navbar-github-description {
        right: 45px;
      }

      a img {
        opacity: 1;
      }
    }

    a {
      @include flex(row, center, center);

      height: 100%;

      img {
        width: 38px;
        height: 38px;
        z-index: 20;
        background-color: $color-lighter;
        opacity: 0.75;
        transition: opacity 0.1s ease-in-out;
      }
    }

    .navbar-github-description {
      @include flex(row, center, center);
      @include font-style(0.8rem, 400);

      position: absolute;
      right: -10rem;
      top: 0;
      height: 100%;
      width: 10rem;
      transition: right 0.25s ease-in-out;
      z-index: 1;
    }
  }
}

@media (min-width: $breakpoint-tablet) and (max-width: $breakpoint-desktop) {
  #navbar {
    #navbar-name {
      width: 12.5rem;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  #navbar {
    #navbar-name {
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
    #navbar-name {
      margin-right: 1rem;
    }
  }
}
</style>
