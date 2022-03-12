<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <header>
        <base-card>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </base-card>
      </header>
      <router-view></router-view>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  // I'm expecting the prop 'id' to come from router.js in the '/coaches/:id' path
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    // Computing the current coache's path link displayed as URL
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    // Reaching for the actual data of 'areas' in <template> v-for loop
    areas() {
      return this.selectedCoach.areas;
    },
    // Reaching for the actual data of 'rate' in <template>
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    // Reaching for the actual data of 'description' in <template>
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    // Finding the correct coach from $store.getters whose id is equal to current id in the current path I'm in
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
