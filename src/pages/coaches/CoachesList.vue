<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <!-- Looping through all the available coaches. The the logic for displaying inside-data shown in this components is stored in CoachItem.vue. All the data are able to show thanks to props defined in that component. -->
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
  },
  computed: {
    // Getting the coaches data stored in the store
    filteredCoaches() {
      return this.$store.getters['coaches/coaches']; // 1st 'coaches' is the namespaced name, 2nd 'coaches' is the getter name
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']; // Needs to be there as computed method because displaying the list of coaches is dependent on the truthiness of hasCoaches value
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
