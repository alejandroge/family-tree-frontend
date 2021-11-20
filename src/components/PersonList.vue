<template>
  <div>
    <h1>Family list</h1>
    <v-data-table
      :headers="headers"
      :items="people"
      :loading="loading"
      class="elevation-3"
    >
      <template v-slot:[`item.sex`]="{ item }">
        {{ titleize(item.sex) }}
      </template>

      <template v-slot:[`item.birthDate`]="{ item }">
        {{ formatDate(item.birthDate) }}
      </template>
      
      <template v-slot:[`item.deathDate`]="{ item }">
        {{ formatDate(item.deathDate) }}
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <a v-if="item.familyUrl" target="blank" :href="item.familyUrl" >
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
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Gender', value: 'sex' },
        { text: 'Birthdate', value: 'birthDate' },
        { text: 'Deathdate', value: 'deathDate' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  mounted() {
    this.loading = true
    api.get('/people')
      .then(res => this.people = res.data.people)
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