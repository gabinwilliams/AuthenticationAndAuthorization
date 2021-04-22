import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getUserProfiles(action) {
  try {
    // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    // passes the username and password from the payload to the server
    const profiles = yield axios.get('/api/user/getProfiles');
      console.log('GET if getting:', profiles.data);
      yield put({ type: "FETCH_PROFILES", payload: profiles.data });
  } catch {
    console.log('Error in GET getProfiles');
    
  }

}



function* fetchCards() {
  yield takeLatest('FETCH_CARDS', getUserProfiles);
  
}

export default fetchCards;