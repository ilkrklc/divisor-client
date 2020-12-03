import { createApp } from 'vue';
import { createGtm } from 'vue-gtm';

import App from './App.vue';

import router from './router';
import { store } from './store';

createApp(App)
  .use(store)
  .use(
    createGtm({
      id: 'GTM-5MCHXN5',
      vueRouter: router,
      enabled: process.env.NODE_ENV === 'production',
    }),
  )
  .use(router)
  .mount('#app');
