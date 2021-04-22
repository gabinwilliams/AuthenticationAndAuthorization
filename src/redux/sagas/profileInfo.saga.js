import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUserInfo(action) {
  try {
    // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/registerInfo', action.payload);
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}



function* profileInfoSaga() {
  yield takeLatest('UPDATE_PROFILE', registerUserInfo);
  // yield takeLatest('UPDATE_TECH', registerUserTech);
}

export default profileInfoSaga;