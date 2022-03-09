export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    // 'addRequest' is the name of mutation from mutations.js
    context.commit('addRequest', newRequest);
  },
};
