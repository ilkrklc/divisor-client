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
        <img src="../assets/git-logo.png" alt="github project link" />
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
    const isGitLogoHovered = ref<boolean>(false);

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

<style scoped lang="scss">
@use '@/styles/variables.scss';

#navbar {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  max-height: 5rem;

  #navbar-name {
    width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: variables.$color-medium;
    margin-right: 2rem;
    text-decoration: none;
  }

  .navbar-links {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.05rem;
      font-weight: bold;
      color: rgba($color: variables.$color-text, $alpha: 0.75);
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
        font-size: 1.1rem;
        color: variables.$color-medium;
        border-bottom-color: rgba($color: variables.$color-medium, $alpha: 0.5);
      }
    }
  }

  #navbar-github {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      img {
        width: 38px;
        height: 38px;
        z-index: 20;
        background-color: variables.$color-lighter;
        opacity: 0.75;
        transition: opacity 0.1s ease-in-out;
      }
    }

    .navbar-github-description {
      position: absolute;
      right: -10rem;
      top: 0;
      height: 100%;
      width: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: right 0.25s ease-in-out;
      z-index: 1;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
}
</style>
