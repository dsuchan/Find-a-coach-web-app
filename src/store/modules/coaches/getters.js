export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // Checks if the state.coaches is truthy and the length is higher than 0
    return state.coaches && state.coaches.length > 0;
  },
};
