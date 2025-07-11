<template>
  <div>
    <a-card>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="submitLogin"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ],
              },
            ]"
            type="email"
            placeholder="Email"
            v-model="email"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              },
            ]"
            v-model="password"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
        <p v-if="error" style="color: red">{{ error }}</p>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submitLogin(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const success = await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });

          if (success) {
            this.$router.push("/");
          } else {
            this.error = "Email or password is incorrect";
          }
        }
      });
    },
  },
};
</script>

<style scoped>
#components-form-demo-normal-login {
  width: 360px;
}
.login-form-button {
  width: 100%;
}
</style>
