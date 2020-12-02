<template>
  <navbar />
  <main>
    <router-view />
  </main>
  <footer-bar />
</template>

<script>
import { defineComponent } from 'vue';

import Navbar from '@/components/Navbar.vue';
import FooterBar from '@/components/FooterBar.vue';

import 'normalize.css';

export default defineComponent({
  components: {
    Navbar,
    FooterBar,
  },
});
</script>

<style lang="scss">
@use '@/styles/variables.scss';

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
  background-color: variables.$color-lighter;
  color: variables.$color-text;
}

main {
  flex-grow: 1;
  display: flex;
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;
}

ul {
  padding: 0;
  list-style: none;
}

@media (max-width: variables.$breakpoint-desktop) {
  main {
    width: 100%;
  }
}
</style>
