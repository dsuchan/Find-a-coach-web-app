export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // Sending the 'coachData' to Firebase. The response will be stored in 'response' only when the fetch is completed.
    const response = await fetch(
      `https://find-a-coach-db-9c5aa-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        // Using PUT method because I want to only have one coach entry per user
        method: 'PUT',
        // Data that's being sent to Firebase, must be converted to JSON
        body: JSON.stringify(coachData),
      }
    );
    // This will be executed only when the fetch above is completed.
    // const responseData = await response.json();

    // Error handling
    if (!response.ok) {
      // ...
    }

    context.commit('registerCoach', {
      ...coachData, // Makes copy of data stored in 'coachData'
      id: userId,
    });
  },

  // Getting all the data from Firebase. I am not using 'payload' argument so therefore it doesn't need to be passed in.
  async loadCoaches(context, payload) {
    // Before I send request for fetching the 'coaches' data, I want to check if I should even fetch it. If this 'if' checks is false, I will not send the request and will stick to the data which I currently have in the vuex store.
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

    // If the 'if' check above returns true, I will fetch the data because I don't have any data stored in my vuex store.
    const response = await fetch(
      'https://find-a-coach-db-9c5aa-default-rtdb.firebaseio.com/coaches/.json'
    );
    const responseData = await response.json();

    // Error handling
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    // Acquired data from Firebase will be stored here later
    const coaches = [];

    // Looping through all objects in 'responseData' which represents data stored in Firebase
    for (const key in responseData) {
      // Reaching for data stored in Firebase and assigning them to properties identical to 'coachData' object above
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      // Pushing the data I've got from Firebase to 'coaches' array created in this instance
      coaches.push(coach);
    }
    // Commiting 'coaches' data as 'setCoaches' to context
    context.commit('setCoaches', coaches);
    // Commiting the timestamp as 'setFetchTimestamp'
    context.commit('setFetchTimestamp');
  },
};
