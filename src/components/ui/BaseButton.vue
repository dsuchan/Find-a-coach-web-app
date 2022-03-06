<template>
  <!-- To the ':class' can be passed in any CSS class which will be defined in <style> -->
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <!-- The dynamic ':to' prop will inherit the actual 'to' defined in router-link component which will be rendered here. -->
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    // This prop allows me to control the styling,
    mode: {
      type: String,
      required: false,
      default: null,
    },
    // This prop will allow me to switch outside of the component between a button and a router link
    link: {
      type: Boolean,
      required: false,
      default: false, // By default, the button will be rendered, not a link
    },
    // This prop will be needed if the router-link is set, so when user click on that link, he will get routed somewhere
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
