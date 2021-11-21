
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/signup">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
  },
  methods: {
    async logout (){
      await this.$store.dispatch('logOut')
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>