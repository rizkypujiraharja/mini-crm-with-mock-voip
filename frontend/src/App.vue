<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'main';
      return layout === 'auth' ? AuthLayout : MainLayout;
    },
  },
};
</script>
