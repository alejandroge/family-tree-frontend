<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="email">Email:</label>
          <input type="text" name="username" v-model="form.user.email">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.user.password">
        </div>
        <button type="submit"> Submit</button>
      </form>
    </div>
    <p v-if="showError" id="error">Email is already in use</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Signup",
  components: {},
  data() {
    return {
      form: {
        user: {
          email: "",
          password: "",
        }
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["signup"]),
    async submit() {
      try {
        await this.signup(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
#error {
  color: red;
}
</style>
