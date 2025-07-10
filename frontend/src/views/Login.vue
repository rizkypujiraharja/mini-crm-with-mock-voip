<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async submitLogin() {
      const success = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
      if (success) {
        this.$router.push('/');
      } else {
        this.error = 'Email atau password salah';
      }
    },
  },
};
</script>
