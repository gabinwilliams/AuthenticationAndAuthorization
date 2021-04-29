import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// function* getUserProfiles() {
//   try {
//     // clear any existing error on the registration page
//     // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
//     // passes the username and password from the payload to the server
//     const profiles = yield axios.get('/api/profile');
//       console.log('GET if getting:', profiles.data);
//       yield put({ type: "FETCH_PROFILES", payload: profiles.data });
//   } catch {
//     console.log('Error in GET getProfiles');
    
//   }

// }

function* fetchMessages() {
  try {
    // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    // passes the username and password from the payload to the server
    const response = yield axios.get('/api/chat/messages');
      console.log('GET for FETCH_MESSAGES: ', response.data);
      yield put({ type: "UPDATE_MESSAGES", payload: response.data });
  } catch {
    console.log('Error in GET Messages');
    
  }

}



function* chatSaga() {
  yield takeLatest('FETCH_MESSAGES', fetchMessages);
  // yield takeLatest('FETCH_LIKES', fetchUserLikes);
  
}

export default chatSaga;