<template>
  <div class="main-layout">
    <h1>Main</h1>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import api from '@/axios';

export default {
  async mounted() {
    try {
      console.log(23)
      const response = await api.get("/auth/me");
      this.$store.commit("SET_USER", response.data.data);
    } catch (err) {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },
};
</script>
