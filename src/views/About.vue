<template>
  <div class="about">
    <p>
      <strong>Divisor</strong> is a tool that calculates <em>divisors</em> of
      natural numbers and <em>common divisors</em> of two natural numbers.
    </p>
    <div class="about-section">
      <h3 :class="{ flash: highlightedSection === 'divisors' }">
        the term <strong><em>"divisor"</em></strong>
      </h3>
      <span class="about-section-quick-info">
        A divisor is a that divides another number completely. Also knowns as
        <strong><em>"factor"</em></strong>
      </span>
      <p>
        The integer <em><strong>b</strong></em> is a divisor of the integer
        <em><strong>a</strong></em> if there is a integer
        <em><strong>c</strong></em> such that c = a / b (NB:
        <em><strong>c</strong></em> is an integer, without decimal part). In
        this case, <em><strong>c</strong></em> is represented as
        <em><strong>a</strong></em> division of a by
        <em><strong>b</strong></em> so <em><strong>b</strong></em> is indeed a
        divisor of <em><strong>a</strong></em> ( <em><strong>a</strong></em> is
        divisible by <em><strong>b</strong></em> ).
      </p>
      <h4 :class="{ flash: highlightedSection === 'proper' }">
        <strong>> "proper divisor"</strong>
      </h4>
      <p>
        A positive proper divisor is a positive divisor of a number
        <em><strong>n</strong></em
        >, excluding <em><strong>n</strong></em> itself. For example, 1, 2, and
        3 are positive proper divisors of 6, but 6 itself is not.
      </p>
    </div>
    <div class="about-section">
      <h3 :class="{ flash: highlightedSection === 'common_divisors' }">
        the term <strong><em>"common divisor"</em></strong>
      </h3>
      <span class="about-section-quick-info">
        An integer that is a submultiple of all the integers of a given set.
        Also knowns as <strong><em>"common factors"</em></strong>
      </span>
      <h4 :class="{ flash: highlightedSection === 'gcd' }">
        <strong>> "greatest common divisor (gcd)"</strong>
      </h4>
      <p>
        The greatest common divisor (GCD), also called the greatest common
        factor, of two numbers is the largest number that divides them both. For
        instance, the greatest common factor of 20 and 15 is 5, since 5 divides
        both 20 and 15 and no larger number has this property. The concept is
        easily extended to sets of more than two numbers: the GCD of a set of
        numbers is the largest number dividing each of them.
      </p>
      <h4 :class="{ flash: highlightedSection === 'lcm' }">
        <strong>> "lowest common multiple (lcm)"</strong>
      </h4>
      <p>
        The lowest common multiple (LCM) of a finite set of non-zero integers is
        the smallest positive number that is a multiple of each integer in the
        set
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    /**
     * Represents route instance
     */
    const route = useRoute();

    /**
     * Represents highlighted section key
     */
    const highlightedSection = computed(() => {
      return route.query.h || '';
    });

    return {
      highlightedSection,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

.about {
  @include flex(column, flex-start, flex-start);

  text-align: left;

  > p {
    @include font-style(1.25rem, 500);
    @include margin-y(3rem);

    strong {
      color: $color-danger;
    }
  }

  &-section {
    @include flex(column, flex-start, flex-start);
    @include padding-y(0.5rem);
    @include margin-y(1.5rem);

    width: 100%;

    h3 {
      @include font-style(1.4rem, 400, 0.75, $color-dark);

      margin: 0;
    }

    &-quick-info {
      @include font-style(0.95rem, 300, 0.65, $color-dark);

      strong {
        font-weight: 500;
      }
    }

    p {
      text-align: justify;
      margin: 1rem auto;
    }

    h4 {
      @include font-style(1.2rem, 400, 0.75, $color-dark);

      margin-top: 2.25rem;
      margin-bottom: 0.5rem;
    }
  }
}

.flash {
  -webkit-animation-name: flash-animation;
  -webkit-animation-duration: 1.25s;

  animation-name: flash-animation;
  animation-duration: 1.25s;
}

@media (max-width: $breakpoint-desktop) {
  .about {
    @include margin-x(5rem);
  }
}

@media (max-width: $breakpoint-tablet) {
  .about {
    @include margin-x(2.5rem);
  }
}

@media (max-width: $breakpoint-mobile) {
  .about {
    @include margin-x(0.75rem);
  }
}

@-webkit-keyframes flash-animation {
  from {
    background: rgba($color: $color-danger, $alpha: 0.5);
  }
  to {
    background: default;
  }
}

@keyframes flash-animation {
  from {
    background: rgba($color: $color-danger, $alpha: 0.5);
  }
  to {
    background: default;
  }
}
</style>
