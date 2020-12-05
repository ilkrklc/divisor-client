import { defineComponent } from 'vue';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

const Component = defineComponent({});

export const store = new Vuex.Store({
  getters: {
    getVersion: jest.fn(() => '1.0.0'),
  },
});

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Component,
    },
  ],
});
