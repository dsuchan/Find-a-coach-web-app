export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // Checks if the state.coaches is truthy and the length is higher than 0
    return state.coaches && state.coaches.length > 0;
  },
  // Checks if the userId already exists or not. '_' and '_2' means that I need these arguments to run this function but I'm not using them.
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
};
