<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <!-- '@change' listens to change of state 'checked' to 'unchecked' -->
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="fronted">Frontend</label>
    </span>
    <span>
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span>
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      // Accessing the current event id, which is defined on every input
      const inputId = event.target.id;
      // Accessing the information if the input is checked or not
      const isActive = event.target.checked;
      // Copying the existing object 'filters' and adding new property 'isActive'
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      // Assigning the new object copy to the previous one
      this.filters = updatedFilters;
      // Emitting the 'change-filter' outside of this component and passing 'updatedFilters' with it. This way, other components can access the new changed filter aswel
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
