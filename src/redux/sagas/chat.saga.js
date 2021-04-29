import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchCurrentChat() {
  try {
    // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    // passes the username and password from the payload to the server
    const response = yield axios.get('/api/chat/currentChat');
      console.log('GET currentChat:', response.data);
      yield put({ type: "CURRENT_CHAT", payload: response.data });
  } catch {
    console.log('Error in GET currentChat');
    
  }

}

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
  yield takeLatest('FETCH_CURRENT_CHAT', fetchCurrentChat);
  
}

export default chatSaga;