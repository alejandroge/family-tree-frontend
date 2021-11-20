<template>
  <v-app>
    <v-main>
      <PersonList />
    </v-main>
  </v-app>
</template>

<script>
import PersonList from './components/PersonList';

export default {
  name: 'App',

  components: {
    PersonList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  a {
    text-decoration: none;
    color: #F5F5F5;
  }
}
</style>