<template>
  <div id="greating">
    <div>Welcome to<strong> divisor</strong>.</div>
    <div>Here you can calculate <em>divisors</em> of natural numbers.</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss';

#greating {
  margin-top: 5rem;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;

  strong {
    color: variables.$color-dark;
  }
}
</style>
