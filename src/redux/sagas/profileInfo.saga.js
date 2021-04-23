import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";



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

function* updateUserLikes(action) {
  
 
  try {

    yield put({ type: 'RESET_STATE'});
  } catch{
    console.log('Error in RESET COUNT');
  }
 
  try {
    console.log('THis is the user like obj', action.payload);
    yield put({ type: 'UPDATE_LIKE_COUNT', payload: action.payload });
    // yield put({ type: 'UPDATE_LIKED_USER_ID', payload: action.payload });

    
  
    
  } catch (error) {
    console.log('Error with POST updating Likes', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }

  try{
    
  } catch{

  }
    
}



function* sendLikesObject(action) {

  

  try {
  
    
    

    yield axios.post('/api/user/updateLikes', action.payload);

     
  } catch (error) {
    console.log('Error with POST sending likes object', error);
    
  }
 
}


function* updateLikedId(action) {
  
  try {
  
    yield put({ type: 'UPDATE_LIKED_USER_ID', payload: action.payload });

    // yield axios.post('/api/user/updateLikes', action.payload);
  } catch (error) {
    console.log('Error with POST updating Likes', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
 
}



function* profileInfoSaga() {
  yield takeLatest('UPDATE_PROFILE', registerUserInfo);
  yield takeLatest('UPDATE_LIKES', updateUserLikes);
  yield takeLatest('UPDATE_LIKED_ID', updateLikedId);
  yield takeLatest('UPDATE_LIKED_OBJECT', sendLikesObject);
  
}

export default profileInfoSaga;