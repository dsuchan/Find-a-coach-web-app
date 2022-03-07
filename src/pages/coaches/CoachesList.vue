<template>
  <section>
    <!-- Listening for the emitted custom event which is defined in CoachFilter.vue -->
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <!-- Previous <button> has been changed to <base-button> and the 'mode' prop gets in the use differentiate the look of button beside the link.  -->
        <base-button mode="outline">Refresh</base-button>
        <!-- Previous <router-link> has been changed to <base-button> and the 'link' prop needed to be added so the Vue can know, which element it should display. The logic of this is stored in BaseButton.vue -->
        <base-button link to="/register">Register as Coach</base-button>
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
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    // Getting the coaches data stored in the store
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']; // 1st 'coaches' is the namespaced name, 2nd 'coaches' is the getter name
      // Checking if the checked value in the checkbox is matched with the value in the coach item
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        // If any of the checked values are not matched, no coach item will be displayed
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']; // Needs to be there as computed method because displaying the list of coaches is dependent on the truthiness of hasCoaches value
    },
  },
  methods: {
    // Setting the 'updatedFilters' as an argument because that's the kind of data I'm emitting from CoachFilter.vue > 'setFilters' method
    setFilters(updatedFilters) {
      // Overwriting the 'activeFilters' to 'updatedFilters' because I always want current data the user selected
      this.activeFilters = updatedFilters;
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
