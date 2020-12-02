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
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

* {
  box-sizing: border-box;
}

#app {
  @include flex(column, flex-start, stretch);

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  background-color: $color-lighter;
  color: $color-text;
}

main {
  @include flex(row);

  flex-grow: 1;
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;
}

ul {
  padding: 0;
  list-style: none;
}

@media (max-width: $breakpoint-desktop) {
  main {
    width: 100%;
  }
}
</style>
