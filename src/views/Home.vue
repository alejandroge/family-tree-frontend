<template>
  <div class="home">
    <PersonList />
  </div>
</template>

<script>
// @ is an alias to /src
import PersonList from '@/components/PersonList.vue'

export default {
  name: 'Home',
  components: {
    PersonList,
  }
}
</script>
