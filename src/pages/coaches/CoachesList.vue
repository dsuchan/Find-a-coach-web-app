<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <!-- List of coaches will be displayed only if hasCoaches is a truthy value, otherwise the h3 tag will be displayed. -->
    <ul v-if="hasCoaches">
      <!-- Displaying every coach with v-for, looping through the data, which i've got from filteredCoaches computed method -->
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
export default {
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
