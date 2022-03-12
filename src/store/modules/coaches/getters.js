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
  shouldUpdate(state) {
    // Accessing the 'lastFetch' value (timestamp set in mutations.js > setFetchTimestamp)
    const lastFetch = state.lastFetch;
    // If 'lastFetch' is false, return true
    if (!lastFetch) return true;
    // Getting current time and date
    const currentTimeStamp = new Date().getTime();
    // Comparing the previous timestamp with current timestamp. This will return true if the difference between timestamp is more than minute ago. Will return false if it's less than minute ago. Dividing by 1000 because both timestamps are in miliseconds.
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
