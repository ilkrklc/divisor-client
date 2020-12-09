import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

<<<<<<< HEAD
import { prepareTitle } from '@/helpers/seo.helpers';
=======
import { prepareTitle } from '@/helpers/seo-helpers';
>>>>>>> main

import Home from '@/views/Home.vue';

/**
 * App routes
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: prepareTitle('Calculator'),
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      title: prepareTitle('About'),
    },
  },
];

/**
 * Router instance
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * Router navigation guard handles document title
 */
router.afterEach(to => {
  // set document title
  document.title = to.meta.title;
});

export default router;
