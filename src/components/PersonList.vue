<template>
  <div>
    <h1>Family list</h1>
    <v-data-table
      :headers="headers"
      :items="people"
      :loading="loading"
      class="elevation-3"
    >
      <template v-slot:[`item.first_name`]="{ item }">
        {{ item.attributes.first_name }}
      </template>

      <template v-slot:[`item.last_name`]="{ item }">
        {{ item.attributes.last_name }}
      </template>

      <template v-slot:[`item.sex`]="{ item }">
        {{ titleize(item.attributes.sex) }}
      </template>

      <template v-slot:[`item.birth_date`]="{ item }">
        {{ formatDate(item.attributes.birth_date) }}
      </template>
      
      <template v-slot:[`item.death_date`]="{ item }">
        {{ formatDate(item.attributes.death_date) }}
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <a v-if="item.attributes.has_children" target="blank">
          Go to family page
          <v-icon color="white accent-4">mdi-link-box</v-icon>
        </a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '../utils/api'

export default {
  name: 'PersonList',
  data() {
    return {
      loading: false,
      people: [],
      headers: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Gender', value: 'sex' },
        { text: 'Birthdate', value: 'birth_date' },
        { text: 'Deathdate', value: 'death_date' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  mounted() {
    this.loading = true
    const token = this.$store.getters.stateToken
    api.get('/people', {headers: {'Authorization': token}})
      .then(res => this.people = res.data.data)
      .catch(err => console.log(err))
      .then(() => this.loading = false)
  },
  methods: {
    titleize(string){
      return string.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
    },
    formatDate(date) {
      if (!date) return '--'
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateObject  = new Date(date);

      return dateObject.toLocaleDateString("en-US", options); // September 17, 2016
    }
  }
}
</script>