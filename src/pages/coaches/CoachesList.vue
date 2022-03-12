<template>
  <div>
    <!-- Used for displaying error mesagges to the user. '!!error' converts truthy string to truthy boolean value. I need boolean if using with :show -->
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <!-- Listening for the emitted custom event which is defined in CoachFilter.vue -->
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <!-- Previous <button> has been changed to <base-button> and the 'mode' prop gets in the use differentiate the look of button beside the link. Passing 'true' as an argument to the 'loadCoaches' because I always want to be able manually refresh the fetching process on coaches. -->
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <!-- Previous <router-link> has been changed to <base-button> and the 'link' prop needed to be added so the Vue can know, which element it should display. The logic of this is stored in BaseButton.vue -->
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
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
  </div>
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
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    // Reaching for boolean value from getters.js > 'isCoach'. If the returned value is false, the <base-button> with Register will not be displayed.
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
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
      // Needs to be there as computed method because displaying the list of coaches is dependent on the truthiness of hasCoaches value and isLoading value
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    // Coaches data will be loaded once this vue instance is created
    this.loadCoaches();
  },
  methods: {
    // Setting the 'updatedFilters' as an argument because that's the kind of data I'm emitting from CoachFilter.vue > 'setFilters' method
    setFilters(updatedFilters) {
      // Overwriting the 'activeFilters' to 'updatedFilters' because I always want current data the user selected
      this.activeFilters = updatedFilters;
    },
    // Loading coaches data from the vuex store
    async loadCoaches(refresh = false) {
      // Once the method is executed, the loading status will change to true
      this.isLoading = true;
      try {
        // Now waiting for dispatch to resolve the request. Adding second argument 'forceCoaches' which is being checked in actions.js >
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
        // If the request could not be resolved, I'll catch the error here and output some message to the user
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // Once dispatch is resolved, loading status will change back to false
      this.isLoading = false;
    },
    // Used for closing the <base-dialog> modal
    handleError() {
      this.error = null;
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
