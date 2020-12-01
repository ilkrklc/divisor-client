<template>
  <li class="recent-item">
    <h3
      :class="['recent-item-name', `${recentItem.calculationType}-recent-item`]"
    >
      {{ calculationTypeDisplayName }}
    </h3>
    <div class="recent-item-badges">
      <div v-if="recentItem.sort !== undefined" class="recent-item-badge">
        {{ sortDisplayName }}
      </div>
      <div v-if="recentItem.onlyProperDivisors" class="recent-item-badge">
        Proper
      </div>
    </div>
    <div class="recent-divisors">
      <span>{{ divisorsHeader }}</span>
      <div
        :class="{
          'long-number': commaSeparatedDivisors.length > 40,
          'very-long-number': commaSeparatedDivisors.length > 90,
        }"
      >
        <span>{{ commaSeparatedDivisors }}</span>
      </div>
    </div>
    <div class="recent-other">
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
      <div class="sum">
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
      <div class="multiply">
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
      <div class="gcd">
        <span>GCD</span>
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
      <div v-if="recentItem.smallest !== undefined" class="smallest">
        <span>Smallest</span>
        <div>
          <span
            :class="{
              'long-number': recentItem.smallest.toString().length > 7,
              'very-long-number': recentItem.smallest.toString().length > 15,
            }"
            >{{ recentItem.smallest }}</span
          >
        </div>
      </div>
      <div v-if="recentItem.leastCommonMultiple !== undefined" class="lcm">
        <span>LCM</span>
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
  </li>
</template>

<script lang="ts">
import RecentItem from '@/models/recent-item.model';
import { CalculationType, SortOptions } from '@/typings/enums';
import {
  getSortOptionDisplayName,
  getCalculationTypeDisplayName,
} from '@/helpers/enum.helpers';

export default {
  props: {
    item: {
      type: RecentItem,
      required: true,
    },
  },
  setup(props: { item: RecentItem }) {
    const sortDisplayName = getSortOptionDisplayName(
      props.item.sort as SortOptions,
    );
    const calculationTypeDisplayName = getCalculationTypeDisplayName(
      props.item.calculationType,
    );
    const commaSeparatedDivisors = props.item.divisors?.join(', ');
    const divisorsHeader = `Number ${props.item.number} has ${
      props.item.count
    }${
      props.item.onlyProperDivisors ? ' proper ' : ' '
    }${calculationTypeDisplayName}:`;

    return {
      recentItem: props.item,
      sortDisplayName,
      calculationTypeDisplayName,
      CalculationType,
      commaSeparatedDivisors,
      divisorsHeader,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss';

.recent-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 14rem;
  border-radius: 0.3rem;
  border: 1px solid rgba($color: variables.$color-dark, $alpha: 0.5);
  background-color: variables.$color-white;
  padding: 0.75rem 1.25rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .recent-item-name {
    position: absolute;
    left: -1.75rem;
    top: -0.5rem;
    transform: rotate(-30deg);
    word-break: break-word;
    width: 100px;
    line-height: 1.2rem;
    padding: 0.1rem 0.25rem;

    &.divisors-recent-item {
      background-color: variables.$color-light;
    }

    &.common_divisors-recent-item {
      background-color: variables.$color-lighter;
    }
  }

  .recent-item-badges {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 1.5rem;
    max-height: 1.5rem;
    width: 100%;

    .recent-item-badge {
      padding: 0.25rem 1rem;
      border-radius: 25px;
      border: 0.8px solid rgba($color: variables.$color-dark, $alpha: 0.75);
      margin-right: 0.25rem;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }

  .recent-divisors {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex-grow: 1;
    width: 100%;

    > span {
      font-size: 0.95rem;
      font-weight: 400;
      margin-bottom: 1.25rem;
    }

    > div {
      align-self: center;
      position: relative;
      max-width: 90%;

      span {
        display: block;
        font-size: 1.5rem;
        font-weight: 800;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
      }

      &::before {
        content: '[';
        position: absolute;
        display: block;
        left: -2.5rem;
        top: -1rem;
        font-size: 3rem;
      }

      &::after {
        content: ']';
        position: absolute;
        display: block;
        right: -2.5rem;
        top: -1rem;
        font-size: 3rem;
      }

      &.long-number {
        &::before {
          top: -1.275rem;
        }

        &::after {
          top: -1.275rem;
        }

        span {
          font-size: 1rem;
        }
      }

      &.very-long-number {
        &::before {
          top: -0.8rem;
          font-size: 2rem;
        }

        &::after {
          top: -0.8rem;
          font-size: 2rem;
        }

        span {
          font-size: 0.85rem;
        }
      }
    }
  }

  .recent-other {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    flex-grow: 4;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      height: 5rem;
      width: 7rem;
      border: 0.8px solid rgba($color: variables.$color-dark, $alpha: 0.5);
      border-radius: 10px;
      color: variables.$color-text;
      -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);

      &.count {
        background-color: rgba($color: variables.$color-dark, $alpha: 0.25);
      }

      &.sum {
        background-color: rgba($color: variables.$color-light, $alpha: 0.5);
      }

      &.multiply {
        background-color: rgba($color: variables.$color-lighter, $alpha: 0.5);
      }

      &.gcd {
        background-color: rgba($color: variables.$color-danger, $alpha: 0.75);
      }

      &.smallest,
      &.lcm {
        background-color: rgba($color: variables.$color-medium, $alpha: 0.25);
      }

      > span {
        flex-grow: 1;
        font-size: 0.95rem;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > div {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        > span {
          font-size: 1.5rem;
          font-weight: 700;

          &.long-number {
            font-size: 1rem;
            font-weight: 700;
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
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 0.5;
    width: 100%;
    margin-top: 0.75rem;
    font-size: 0.7rem;
    font-weight: 400;
  }
}
</style>
