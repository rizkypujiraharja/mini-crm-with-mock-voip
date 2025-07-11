<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible :style="{minHeight:'100vh'}">
      <div class="logo">CRM</div>
      <a-menu
        theme="dark"
        mode="inline"
        :selected-keys="[this.$route.name]"
      >
        <a-menu-item key="contacts" @click="$router.push({ name: 'contacts' })">
          <a-icon type="contacts" />
          <span>Contacts</span>
        </a-menu-item>
        <a-menu-item key="callLogs" @click="$router.push({ name: 'callLogs' })">
          <a-icon type="phone" />
          <span>Call Logs</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', flex: 'unset' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

import api from '@/lib/axios';

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  async mounted() {
    try {
      const response = await api.get("/auth/me");
      this.$store.commit("SET_USER", response.data.data);
    } catch (err) {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

