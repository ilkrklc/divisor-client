<template>
  <div id="navbar">
    <div id="navbar-name">
      Divisor
    </div>
    <div class="navbar-links">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div id="navbar-github">
      <a href="https://github.com/ilkrklc/divisor">
        <img src="../assets/git-logo.png" alt="github project link" />
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'navbar',
  components: {},
});
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss';

#navbar {
  display: flex;
  justify-content: space-between;
  height: 4rem;
  max-height: 4rem;

  #navbar-name {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: default;
  }

  .navbar-links {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-grow: 1;

    a {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;

      &.router-link-exact-active {
        color: variables.$color-danger;
        text-decoration: underline;
      }
    }
  }

  #navbar-github {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 1rem;
      padding-left: 1rem;
      height: 100%;

      img {
        width: 38px;
        height: 38px;
      }
    }
  }
}
</style>
