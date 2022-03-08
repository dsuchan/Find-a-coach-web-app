<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <!-- Listening for the custom event created in CoachForm.vue -->
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    // Accepting 'formData' from emitted custom event 'save-data' as argument to this method
    saveData(data) {
      // Getting the data from vuex store (mutations.js, actions.js)
      this.$store.dispatch('coaches/registerCoach', data);
      // Navigating to the '/coaches' path once the form is submitted. With 'replace' method I can navigate back to the previous path - that's what I actually want once the user submitted the form. If the user should have the ability to route back, instead of 'replace' use 'push'.
      this.$router.replace('/coaches');
    },
  },
};
</script>
