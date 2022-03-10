export default {
  // Unused arguments are replaced with '_' because they need to be there so the function can execute properly but doesn't need to be used
  requests(state, _, _2, rootGetters) {
    // Filtering the requests that has the current coachId equal to coachId stored in rootGetters (store > index.js) and returning only those requests. This ensures, that sent requests to coach that is not me are not visible for me.
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
