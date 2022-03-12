export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    // Payload is a list of coaches
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    // Generating the current time and date as a timestamp
    state.lastFetch = new Date().getTime();
  },
};
