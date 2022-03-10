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

    // Checking if the response was not ok
    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData, // Makes copy of data stored in 'coachData'
      id: userId,
    });
  },
};
