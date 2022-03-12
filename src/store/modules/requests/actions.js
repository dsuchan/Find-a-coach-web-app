export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    // Sending data to Firebase
    const response = await fetch(
      `https://find-a-coach-db-9c5aa-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST', // Here using POST, because I want to always send a new request, doesn't need to be overwited like PUT request does
        body: JSON.stringify(newRequest),
      }
    );

    // From 'response' will be used newly generated id from Firebase
    const responseData = await response.json();

    // Checking the response status and handling potential error
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    // The newly generated id is stored in 'name' property but I want to assign it to this local data storage (newRequest object) as 'newRequest.id'
    newRequest.id = responseData.name;
    // Adding 'coachId' locally once the data arrived from request because I don't want to have it in Firebase
    newRequest.coachId = payload.coachId;

    // 'addRequest' is the name of mutation from mutations.js
    context.commit('addRequest', newRequest);
  },
  // Loading requests data only for currently active user (coach). This is a GET method - GET method is set by default, therefore it's not required to specify it.
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://find-a-coach-db-9c5aa-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();

    // Handling potential errors
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    // Transforming data I'm getting from Firebase to data with local form. They need to have userEmail, message, id and coachId.
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key, // This comes from current key of loop
        coachId: coachId, // This comes from line 37 - from rootGetters
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequest', requests);
  },
};
