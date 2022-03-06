<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <!-- Looping through 'areas' from index.js > state > coaches object. Hence this is <base-badge> component with defined props inside of it, I need to specify these props and link them to the current area I'm looping. -->
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <!-- Previous <router-link> has been changed to <base-button> and the 'link' prop needed to be added so the Vue can know, which element it should display. The logic of this is stored in BaseButton.vue -->
      <base-button mode="outline" link :to="coachContactLink"
        >Contact</base-button
      >
      <!-- Previous <router-link> has been changed to <base-button> and the 'link' prop needed to be added so the Vue can know, which element it should display. The logic of this is stored in BaseButton.vue -->
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return '/coaches/' + this.id + '/contact'; // /coaches/c1/contact
    },
    coachDetailsLink() {
      return '/coaches/' + this.id; // /coaches/c1
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
