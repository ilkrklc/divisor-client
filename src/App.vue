<template>
  <navbar />
  <main>
    <router-view />
  </main>
  <footer-bar />
  <scroll-top />
</template>

<script>
import { defineComponent } from 'vue';

import Navbar from '@/components/Navbar.vue';
import FooterBar from '@/components/FooterBar.vue';
import ScrollTop from './components/ScrollTop.vue';

import 'normalize.css';

export default defineComponent({
  components: {
    Navbar,
    FooterBar,
    ScrollTop,
  },
});
</script>

<style lang="scss">
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

@import '@/styles/_fonts.scss';

* {
  box-sizing: border-box;
}

select,
button,
.checkbox-label {
  cursor: pointer;
}

button {
  @include no-outline;

  background: transparent;
  border: none;
}

html {
  scroll-behavior: smooth;
}

#app {
  @include flex(column, flex-start, stretch);

  font-family: $font-raleway;
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
