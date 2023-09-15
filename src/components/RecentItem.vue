<template>
  <li class="recent-item">
    <div class="recent-content">
      <h3
        :class="[
          'recent-item-name',
          `${recentItem.calculationType}-recent-item`,
        ]"
      >
        {{ calculationTypeDisplayName }}
      </h3>
      <div class="recent-item-badges">
        <div
          v-if="recentItem.sort !== SortOptions.NotDefined"
          class="recent-item-badge"
        >
          {{ sortDisplayName }}
        </div>
        <div v-if="recentItem.onlyProperDivisors" class="recent-item-badge">
          Proper
        </div>
      </div>
      <div
        class="recent-divisors"
        :class="{
          'long-number':
            commaSeparatedDivisors && commaSeparatedDivisors.length > 50,
        }"
      >
        <div
          v-html="divsorsHeaderHtml"
          :class="{ 'no-result': recentItem.count === 0 }"
        />
        <div
          v-if="recentItem.count > 0"
          :class="{
            'long-number':
              commaSeparatedDivisors && commaSeparatedDivisors.length > 50,
            'very-long-number':
              commaSeparatedDivisors && commaSeparatedDivisors.length > 200,
          }"
        >
          <span>{{ commaSeparatedDivisors }}</span>
        </div>
      </div>
      <div v-if="recentItem.count > 0" class="recent-other">
        <div class="count">
          <span>Count</span>
          <div>
            <span
              :class="{
                'long-number': recentItem.count.toString().length > 7,
                'very-long-number': recentItem.count.toString().length > 15,
              }"
              >{{ recentItem.count }}</span
            >
          </div>
        </div>
        <div v-if="recentItem.sum !== undefined" class="sum">
          <span>Sum</span>
          <div>
            <span
              :class="{
                'long-number': recentItem.sum.toString().length > 7,
                'very-long-number': recentItem.sum.toString().length > 15,
              }"
              >{{ recentItem.sum }}</span
            >
          </div>
        </div>
        <div v-if="recentItem.multiplication !== undefined" class="multiply">
          <span>Multiply</span>
          <div>
            <span
              :class="{
                'long-number': recentItem.multiplication.toString().length > 7,
                'very-long-number':
                  recentItem.multiplication.toString().length > 15,
              }"
              >{{ recentItem.multiplication }}</span
            >
          </div>
        </div>
        <div v-if="recentItem.greatest !== undefined" class="gcd">
          <span>
            <router-link class="highlight-link" to="/about?h=gcd"
              >GCD
            </router-link>
          </span>
          <div>
            <span
              :class="{
                'long-number': recentItem.greatest.toString().length > 7,
                'very-long-number': recentItem.greatest.toString().length > 15,
              }"
              >{{ recentItem.greatest }}</span
            >
          </div>
        </div>
        <div v-if="recentItem.leastCommonMultiple !== undefined" class="lcm">
          <span>
            <router-link class="highlight-link" to="/about?h=lcm"
              >LCM
            </router-link>
          </span>
          <div>
            <span
              :class="{
                'long-number':
                  recentItem.leastCommonMultiple.toString().length > 7,
                'very-long-number':
                  recentItem.leastCommonMultiple.toString().length > 15,
              }"
              >{{ recentItem.leastCommonMultiple }}</span
            >
          </div>
        </div>
      </div>
      <div class="recent-created-on">
        <span>{{ recentItem.createdOn }}</span>
      </div>
    </div>
    <button
      type="button"
      class="recent-item-remove-button"
      @click="handleDelete(recentItem.id as string)"
    >
      <span>x</span>
    </button>
  </li>
</template>

<script lang="ts">
import {
  getCalculationTypeDisplayName,
  getSortOptionDisplayName,
} from '@/helpers/enum.helpers';
import { useStore } from '@/hooks/useStore';
import RecentItem from '@/models/recent-item.model';
import { RecentActionTypes } from '@/store/modules/recent/recent.actions';
import { CalculationType, SortOptions } from '@/typings/enums';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: RecentItem,
      required: true,
    },
  },
  setup(props: { item: RecentItem }) {
    /**
     * Vuex store
     */
    const store = useStore();

    /**
     * Applied sort option display name
     */
    const sortDisplayName = getSortOptionDisplayName(
      props.item.sort as SortOptions,
    );

    /**
     * Calculation type display name
     */
    const calculationTypeDisplayName = getCalculationTypeDisplayName(
      props.item.calculationType,
    );

    /**
     * Comma separated calculated divisors ready for display
     */
    const commaSeparatedDivisors = props.item.divisors?.join(', ');

    /**
     * Calculated divisor seciton header ready for display
     */
    const divsorsHeaderHtml = computed(() => {
      // initialize header
      let result = '';

      // determine header start according to calculation type
      if (props.item.calculationType === CalculationType.Divisors)
        result += `Number ${props.item.number1} has `;
      if (props.item.calculationType === CalculationType.CommonDivisors)
        result += `Numbers ${props.item.number1} and ${props.item.number2} has `;

      // check for applied proper divisors filter
      result += `${props.item.count}${
        props.item.onlyProperDivisors ? ' proper' : ''
      } <a href="/about?h=${
        props.item.calculationType
      }" class="highlight-link">${calculationTypeDisplayName}</a>`;

      return result;
    });

    /**
     * Handles item delete action - recent item remove button click event
     */
    function handleDelete(id: string): void {
      if (!id) return;

      store.dispatch(RecentActionTypes.RemoveItem, id);
    }

    return {
      recentItem: props.item,
      sortDisplayName,
      calculationTypeDisplayName,
      CalculationType,
      commaSeparatedDivisors,
      handleDelete,
      SortOptions,
      divsorsHeaderHtml,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;

.recent-item {
  @include flex(row);

  position: relative;
  border-radius: 0.3rem;
  border: 1px solid rgba($color: $color-dark, $alpha: 0.5);
  min-height: 225px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover &-remove-button {
    top: -1.6rem;
    right: -2rem;
    z-index: 12;
  }

  &:hover .recent-content {
    z-index: 17;
  }

  &:hover &-remove-button:hover {
    z-index: 20;
  }

  &-remove-button {
    @include flex(row, center, center);
    @include font-style(1.75rem, 800, 1, $color-white);

    position: absolute;
    top: 0rem;
    right: 0rem;
    width: 3.2rem;
    height: 3.2rem;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    font-family: $font-raj;
    background-color: $color-danger;
    z-index: 5;
    transition:
      top 0.25s,
      right 0.25s;
  }

  .recent-content {
    @include flex(column, flex-start, center);
    @include padding-x(1.25rem);
    @include padding-y(0.75rem);

    flex-grow: 1;
    z-index: 10;
    background-color: $color-white;
    border-radius: 0.3rem;
  }
}

.recent-item-badges {
  @include flex(row, flex-end, center);

  position: relative;
  height: 1.5rem;
  max-height: 1.5rem;
  width: 100%;

  .recent-item-badge {
    @include padding-x(1rem);
    @include padding-y(0.25rem);
    @include font-style(0.75rem, 400);

    border-radius: 25px;
    border: 0.8px solid rgba($color: $color-dark, $alpha: 0.75);
    margin-right: 0.25rem;
  }
}

.recent-divisors {
  @include flex(column, flex-start, stretch);

  flex-grow: 1;
  width: 100%;
  margin-bottom: 1rem;

  &.long-number {
    margin-bottom: 2rem;
  }

  > div:first-child {
    @include font-style(1.1rem, 400);

    margin-bottom: 1.25rem;
    flex-grow: 1;

    &.no-result {
      font-size: 1.25rem;
      line-height: 120px;
    }
  }

  > div:last-child:not(.no-result) {
    align-self: center;
    position: relative;
    max-width: 85%;

    span {
      @include font-style(1.5rem, 800);

      display: block;
      overflow-x: auto;
      overflow-y: hidden;
    }

    &::before {
      content: '[';
      position: absolute;
      display: block;
      left: -2.5rem;
      top: -0.8rem;
      font-size: 3rem;
    }

    &::after {
      content: ']';
      position: absolute;
      display: block;
      right: -2.5rem;
      top: -0.8rem;
      font-size: 3rem;
    }

    &.long-number {
      &::before {
        top: -1.275rem;
        font-size: 3.5rem;
      }

      &::after {
        top: -1.275rem;
        font-size: 3.5rem;
      }

      span {
        font-size: 1rem;
      }
    }

    &.very-long-number {
      &::before {
        top: -0.8rem;
        font-size: 3.5rem;
      }

      &::after {
        top: -0.8rem;
        font-size: 3.5rem;
      }

      span {
        font-size: 0.85rem;
      }
    }
  }
}

.recent-item-name {
  @include font-style(1rem, 500);

  position: absolute;
  left: -1.75rem;
  top: -0.5rem;
  transform: rotate(-30deg);
  word-break: break-word;
  width: 100px;
  line-height: 1.2rem;
  padding: 0.2rem 0.3rem;
  border-radius: 5px;

  &.divisors-recent-item {
    background-color: $color-light;
  }

  &.common_divisors-recent-item {
    background-color: $color-danger;
  }
}

.recent-other {
  @include flex(row, space-evenly, flex-end);

  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  flex-grow: 4;
  width: 100%;

  > div {
    @include flex(column, flex-start, stretch);
    @include shadow-centered(5px, 0.35);

    height: 5rem;
    width: 7rem;
    border: 0.8px solid rgba($color: $color-dark, $alpha: 0.5);
    border-radius: 10px;
    color: $color-text;

    &.count {
      background-color: rgba($color: $color-dark, $alpha: 0.25);
    }

    &.sum {
      background-color: rgba($color: $color-light, $alpha: 0.5);
    }

    &.multiply {
      background-color: rgba($color: $color-lighter, $alpha: 0.5);
    }

    &.gcd {
      background-color: rgba($color: $color-danger, $alpha: 0.75);
    }

    &.lcm {
      background-color: rgba($color: $color-medium, $alpha: 0.25);
    }

    > span {
      @include flex(row, center, center);
      @include font-style(1rem, 400);

      height: 50%;
    }

    > div {
      @include flex(row, center, flex-start);

      height: 50%;

      > span {
        @include font-style(1.5rem, 700);

        &.long-number {
          @include font-style(1rem, 700);

          word-break: break-all;
        }

        &.very-long-number {
          font-size: 0.75rem;
        }
      }
    }
  }
}

.recent-created-on {
  @include flex(row, flex-end, flex-end);
  @include font-style(0.7rem, 500);

  height: 1rem;
  width: 100%;
}

@media (max-width: $breakpoint-desktop) {
  .recent-other {
    flex-wrap: wrap;

    > div {
      @include shadow-centered(2.5px, 0.3);

      height: 4rem;
      width: 5rem;
      border-radius: 8px;
      margin-bottom: 1rem;

      > span {
        @include font-style(0.85rem, 400);
      }

      > div {
        > span {
          @include font-style(1.25rem, 700);

          &.long-number {
            @include font-style(0.9rem, 700);

            word-break: break-all;
          }

          &.very-long-number {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .recent-divisors {
    > span {
      @include font-style(0.9rem, 400);

      &.no-result {
        font-size: 1rem;
      }
    }

    > div {
      span {
        @include font-style(1.25rem, 800);
      }

      &::before {
        left: -1rem;
      }

      &::after {
        right: -1rem;
      }
    }
  }

  .recent-created-on {
    @include font-style(0.5rem, 500);
  }
}
</style>
