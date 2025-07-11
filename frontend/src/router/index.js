import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store';

import Contacts from '@/views/Contacts.vue'
import CallLogs from '@/views/CallLogs.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: 'auth' },
    },
    {
      path: '/',
      name: 'contacts',
      component: Contacts,
      meta: { requiresAuth: true },
    },
    {
      path: '/call-logs',
      name: 'callLogs',
      component: CallLogs,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
